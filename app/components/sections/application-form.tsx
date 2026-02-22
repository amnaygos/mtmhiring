"use client";

import { FluidInput } from "../ui/fluid-input";
import { FluidSelect } from "../ui/fluid-select";
import { MagneticButton } from "../ui/magnetic-button";
import { motion } from "framer-motion";
import { Upload, X, File, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { countries } from "@/lib/countries";
import { cn } from "@/lib/utils";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// React-Select styles for dark theme
const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: "transparent",
        borderColor: state.isFocused ? "white" : "#262626", // neutral-800
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: `1px solid ${state.isFocused ? "white" : "#262626"}`,
        borderRadius: 0,
        boxShadow: "none",
        "&:hover": {
            borderColor: "white"
        },
        padding: "0",
        minHeight: "41px"
    }),
    valueContainer: (provided: any) => ({
        ...provided,
        padding: "0",
    }),
    input: (provided: any) => ({
        ...provided,
        color: "white",
        margin: "0",
        padding: "0"
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: "transparent" // Managed by floating label
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: "white"
    }),
    multiValue: (provided: any) => ({
        ...provided,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "4px"
    }),
    multiValueLabel: (provided: any) => ({
        ...provided,
        color: "white",
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        color: "#a3a3a3", // neutral-400
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white"
        }
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: "#000",
        border: "1px solid #262626",
        zIndex: 50
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? "rgba(255, 255, 255, 0.2)" : state.isFocused ? "rgba(255, 255, 255, 0.1)" : "transparent",
        color: "white",
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)"
        }
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (provided: any, state: any) => ({
        ...provided,
        color: state.isFocused ? "white" : "#737373", // neutral-500
        "&:hover": { color: "white" },
        transform: state.isFocused ? "rotate(180deg)" : "none",
        transition: "transform 0.3s ease",
        padding: "0"
    }),
};

export function ApplicationForm() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        countryCode: "+974",
        phone: "",
        location: "",
        nationality: "",
        age: "",
        gender: "",
    });

    const [availabilityDate, setAvailabilityDate] = useState<Date | null>(null);
    const [selectedModalities, setSelectedModalities] = useState<any[]>([]);
    const [selectFocused, setSelectFocused] = useState(false);
    const [dateFocused, setDateFocused] = useState(false);

    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
    const ALLOWED_TYPES = [
        "application/msword", // .doc
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
        "application/pdf", // .pdf
        "application/vnd.ms-powerpoint", // .ppt
        "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp"
    ];

    const validateFile = (selectedFile: File) => {
        setError(null);
        if (selectedFile.size > MAX_FILE_SIZE) {
            setError("File exceeds the maximum limit of 100MB.");
            return false;
        }
        if (!ALLOWED_TYPES.includes(selectedFile.type)) {
            setError("Invalid file type. Please upload a Word Document, PDF, PowerPoint, or Image.");
            return false;
        }
        return true;
    };

    const handleFileSelect = (selectedFile: File) => {
        if (validateFile(selectedFile)) {
            setFile(selectedFile);
        } else {
            // Reset input so they can select the same file again if they want
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            if (e.dataTransfer.files.length > 1) {
                setError("Please upload only one file.");
                return;
            }
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.name || !formData.email) {
            setError("Name and Email are required.");
            return;
        }

        if (!file) {
            setError("Please upload your CV / Resume.");
            return;
        }

        setIsSubmitting(true);

        try {
            const brandId = process.env.NEXT_PUBLIC_BRAND_ID || '';
            let fileUrl = "";

            // Upload file
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `resumes/${fileName}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('dox')
                .upload(filePath, file);

            if (uploadError) {
                console.error("Upload error:", uploadError);
                throw new Error("Failed to upload file. Please try again.");
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('dox')
                .getPublicUrl(filePath);

            fileUrl = publicUrl;

            // Insert into leads table
            const { error: insertError } = await supabase
                .from('leads')
                .insert([
                    {
                        full_name: formData.name,
                        phone_number: formData.phone ? `${formData.countryCode} ${formData.phone}` : null,
                        brand_id: brandId,
                        form_code: 'LP_GROUP_INSTRUCTOR',
                        status: 'New',
                        dox_file_urls: [fileUrl],
                        website_source: 'MTM Landing Page',
                        metadata: {
                            email: formData.email,
                            location: formData.location || null,
                            nationality: formData.nationality || null,
                            age: formData.age ? parseInt(formData.age, 10) : null,
                            gender: formData.gender || null,
                            availability_date: availabilityDate ? availabilityDate.toISOString() : null,
                            gx_modalities: selectedModalities.map(m => m.value),
                            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                            referral: document.referrer || null,
                        }
                    }
                ]);

            if (insertError) {
                console.error("Insert error:", insertError);
                throw new Error("Failed to submit application. Please try again.");
            }

            // Success
            setIsSuccess(true);
            setFormData({ name: "", email: "", countryCode: "+974", phone: "", location: "", nationality: "", age: "", gender: "" });
            setAvailabilityDate(null);
            setSelectedModalities([]);
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";

            // Trigger Meta Pixel Lead Event
            if (typeof window !== "undefined" && (window as any).fbq) {
                (window as any).fbq('track', 'Lead');
            }

        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <section id="apply" className="py-32 px-6 md:px-12 relative z-10 bg-black">
                <div className="max-w-6xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-start justify-center py-20"
                    >
                        <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                        <h2 className="text-4xl md:text-6xl font-thin mb-4 text-left uppercase tracking-[0.1em]">
                            Application Received
                        </h2>
                        <p className="text-neutral-400 text-left text-lg md:text-xl font-light tracking-wide max-w-2xl">
                            Thank you for your interest! We will review your application and get back to you shortly.
                        </p>
                        <MagneticButton
                            className="mt-12 px-10"
                            onClick={() => setIsSuccess(false)}
                        >
                            Submit Another
                        </MagneticButton>
                    </motion.div>
                </div>
            </section>
        )
    }

    const nationalityOptions = countries.map(c => ({ label: c, value: c }));
    const genderOptions = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" }
    ];

    const modalityOptions = [
        { label: "Les Mills programs (BodyPump, BodyCombat, BodyAttack)", value: "Les Mills" },
        { label: "TRX", value: "TRX" },
        { label: "HIIT", value: "HIIT" },
        { label: "Spinning", value: "Spinning" },
        { label: "Zumba", value: "Zumba" },
        { label: "Step & Aerobics", value: "Step & Aerobics" },
        { label: "Belly Dance, Aero Dance, Choreography", value: "Dance Workouts" },
        { label: "Pilates & Yoga", value: "Pilates & Yoga" }
    ];

    return (
        <section id="apply" className="py-32 px-6 md:px-12 relative z-10 bg-black">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-thin mb-6 text-left uppercase tracking-[0.1em]">
                        Join the Team of Instructors
                    </h2>
                    <p className="text-neutral-400 text-left mb-16 max-w-2xl text-lg md:text-xl font-light tracking-wide">
                        We are seeking Fitness Group Instructors. Submit your credentials for review.
                    </p>

                    <form className="space-y-12" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <FluidInput
                                label="Full Name"
                                id="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <FluidInput
                                label="Email Address"
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <div className="relative pt-6 group">
                                <div className="flex items-end border-b border-neutral-800 group-focus-within:border-white transition-colors duration-300">
                                    <div className="w-20">
                                        <input
                                            id="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleInputChange}
                                            className="w-full bg-transparent py-2 text-white focus:outline-none text-center border-r border-neutral-800 group-focus-within:border-white/20"
                                            placeholder="+974"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-transparent py-2 px-4 text-white focus:outline-none"
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                </div>
                                <label
                                    className={cn(
                                        "absolute left-0 transition-all duration-300 pointer-events-none",
                                        (formData.phone || formData.countryCode) ? "-top-2 text-xs text-white font-medium" : "top-8 text-neutral-500"
                                    )}
                                >
                                    Phone Number
                                </label>
                            </div>
                            <FluidSelect
                                label="Current Location"
                                id="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                options={nationalityOptions}
                            />
                            <FluidSelect
                                label="Nationality"
                                id="nationality"
                                value={formData.nationality}
                                onChange={handleInputChange}
                                options={nationalityOptions}
                            />
                            <FluidInput
                                label="Age"
                                id="age"
                                type="number"
                                min="18"
                                max="100"
                                value={formData.age}
                                onChange={handleInputChange}
                            />
                            <FluidSelect
                                label="Gender"
                                id="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                options={genderOptions}
                            />

                            {/* Date Picker Custom Styling Wrapper */}
                            <div className="relative pt-6">
                                <DatePicker
                                    id="availabilityDate"
                                    selected={availabilityDate}
                                    onChange={(date: Date | null) => setAvailabilityDate(date)}
                                    onFocus={() => setDateFocused(true)}
                                    onBlur={() => setDateFocused(false)}
                                    className={`w-full bg-transparent border-b border-neutral-800 py-2 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors duration-300 ${!availabilityDate && !dateFocused ? 'text-transparent' : ''}`}
                                    dateFormat="MMMM d, yyyy"
                                    minDate={new Date()}
                                    placeholderText="Select a date"
                                    calendarClassName="bg-black border border-neutral-800 text-white !font-sans"
                                />
                                <label
                                    htmlFor="availabilityDate"
                                    className={`absolute left-0 top-2 text-neutral-500 transition-all duration-300 pointer-events-none ${(dateFocused || availabilityDate) ? "-top-2 text-xs text-white font-medium" : "top-8 text-neutral-500"}`}
                                >
                                    When will you be able to join?
                                </label>

                                {/* Injected styles for DatePicker internals to match dark theme */}
                                <style jsx global>{`
                                .react-datepicker-wrapper {
                                    width: 100%;
                                }
                                .react-datepicker {
                                    font-family: inherit !important;
                                    background-color: #000 !important;
                                    color: white !important;
                                    border: 1px solid #262626 !important;
                                }
                                .react-datepicker__header {
                                    background-color: #0a0a0a !important;
                                    border-bottom: 1px solid #262626 !important;
                                }
                                .react-datepicker__current-month, .react-datepicker__day-name {
                                    color: white !important;
                                }
                                .react-datepicker__day {
                                    color: #d4d4d4 !important;
                                }
                                .react-datepicker__day:hover {
                                    background-color: #262626 !important;
                                }
                                .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
                                    background-color: white !important;
                                    color: black !important;
                                }
                                .react-datepicker__day--disabled {
                                    color: #404040 !important;
                                }
                                .react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::before {
                                    border-bottom-color: #262626 !important;
                                }
                                .react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::after, .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::after {
                                    border-bottom-color: #0a0a0a !important;
                                }
                            `}</style>
                            </div>
                        </div>

                        <div className="relative pt-6">
                            <Select
                                isMulti
                                options={modalityOptions}
                                styles={customStyles}
                                value={selectedModalities}
                                onChange={(newValue) => setSelectedModalities(newValue as any[])}
                                onFocus={() => setSelectFocused(true)}
                                onBlur={() => setSelectFocused(false)}
                                placeholder=""
                                instanceId="gx-modalities-select"
                            />
                            <label
                                className={`absolute left-0 top-2 text-neutral-500 transition-all duration-300 pointer-events-none ${(selectFocused || selectedModalities.length > 0) ? "-top-2 text-xs text-white font-medium" : "top-8 text-neutral-500"}`}
                            >
                                GX Modalities Experience
                            </label>
                        </div>

                        <div className="space-y-4">
                            <div
                                className={`border border-dashed rounded-xl p-8 transition-colors duration-300 relative ${dragActive ? "border-white bg-white/5" : "border-white/20 hover:border-white/40"
                                    } ${!file && isSubmitting ? "border-red-500/50" : ""}`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    className="hidden"
                                    id="cv-upload"
                                    ref={fileInputRef}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            handleFileSelect(e.target.files[0]);
                                        }
                                    }}
                                    accept=".doc,.docx,.pdf,.ppt,.pptx,image/*"
                                />

                                {!file ? (
                                    <div className="text-center cursor-pointer">
                                        <Upload className="w-8 h-8 mx-auto mb-4 text-neutral-400" />
                                        <p className="text-sm text-neutral-400 uppercase tracking-widest mb-2">
                                            Upload CV / Resume <span className="text-red-500">*</span>
                                        </p>
                                        <p className="text-xs text-neutral-600 mb-2">
                                            Drag & Drop or Click to Browse
                                        </p>
                                        <p className="text-xs text-neutral-500">
                                            Max 100MB. PDF, Word, PowerPoint, or Images only.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                                        <div className="flex items-center space-x-4 overflow-hidden">
                                            <div className="p-3 bg-white/10 rounded-full">
                                                <File className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-medium text-white truncate max-w-[200px] md:max-w-xs">
                                                    {file.name}
                                                </p>
                                                <p className="text-xs text-neutral-400">
                                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFile(null);
                                                if (fileInputRef.current) fileInputRef.current.value = "";
                                                setError(null);
                                            }}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                        >
                                            <X className="w-5 h-5 text-neutral-400 hover:text-white" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-red-500 text-center"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </div>

                        <div className="text-left">
                            <MagneticButton
                                className={`w-full md:w-auto px-12 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Join our team"}
                            </MagneticButton>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
