"use client";

import { FluidInput } from "../ui/fluid-input";
import { FluidSelect } from "../ui/fluid-select";
import { MagneticButton } from "../ui/magnetic-button";
import { motion } from "framer-motion";
import { Upload, X, File, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { countries } from "@/lib/countries";
import { cn } from "@/lib/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export function ApplicationForm() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const coverLetterInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        countryCode: "+974",
        phone: "",
        nationality: "",
    });

    const [availabilityDate, setAvailabilityDate] = useState<Date | null>(null);
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

    const handleFileSelect = (selectedFile: File, type: 'cv' | 'cover' | 'video') => {
        if (validateFile(selectedFile)) {
            if (type === 'cv') setFile(selectedFile);
            else if (type === 'cover') setCoverLetterFile(selectedFile);
            else if (type === 'video') setVideoFile(selectedFile);
        } else {
            if (type === 'cv' && fileInputRef.current) fileInputRef.current.value = "";
            else if (type === 'cover' && coverLetterInputRef.current) coverLetterInputRef.current.value = "";
            else if (type === 'video' && videoInputRef.current) videoInputRef.current.value = "";
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
            handleFileSelect(e.dataTransfer.files[0], 'cv');
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

        if (!file || !coverLetterFile) {
            setError("Please upload both your CV and Cover Letter.");
            return;
        }

        setIsSubmitting(true);

        try {
            const apiFormData = new FormData();
            apiFormData.append("cv_attach", file);
            apiFormData.append("cover_latter_attach", coverLetterFile);
            apiFormData.append("applicant_name", formData.name);
            apiFormData.append("phone_number", formData.phone ? `${formData.countryCode} ${formData.phone}` : "");
            apiFormData.append("email_id", formData.email);
            apiFormData.append("when_can_join", availabilityDate ? availabilityDate.toISOString().split('T')[0] : "");
            apiFormData.append("job_title", "HR-OPN-2026-0002");
            apiFormData.append("nationality", formData.nationality || "");

            if (videoFile) {
                apiFormData.append("video", videoFile);
            }

            const response = await fetch(
                "https://erp.mtm-hub.com/api/v2/method/opening_jobs_api/apply_for_a_job",
                {
                    method: "POST",
                    body: apiFormData,
                }
            );

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData?.message || "Failed to submit application.");
            }

            const data = await response.json();

            // Success
            setIsSuccess(true);
            setFormData({ name: "", email: "", countryCode: "+974", phone: "", nationality: "" });
            setAvailabilityDate(null);
            setFile(null);
            setCoverLetterFile(null);
            setVideoFile(null);

            if (fileInputRef.current) fileInputRef.current.value = "";
            if (coverLetterInputRef.current) coverLetterInputRef.current.value = "";
            if (videoInputRef.current) videoInputRef.current.value = "";

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
                                label="Nationality"
                                id="nationality"
                                value={formData.nationality}
                                onChange={handleInputChange}
                                options={nationalityOptions}
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
                                            handleFileSelect(e.target.files[0], 'cv');
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

                            {/* Cover Letter Upload */}
                            <div
                                className={`border border-dashed rounded-xl p-8 transition-colors duration-300 relative ${!coverLetterFile && isSubmitting ? "border-red-500/50" : "border-white/20 hover:border-white/40"}`}
                                onClick={() => coverLetterInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    className="hidden"
                                    id="cover-letter-upload"
                                    ref={coverLetterInputRef}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            handleFileSelect(e.target.files[0], 'cover');
                                        }
                                    }}
                                    accept=".doc,.docx,.pdf,.ppt,.pptx,image/*"
                                />

                                {!coverLetterFile ? (
                                    <div className="text-center cursor-pointer">
                                        <Upload className="w-8 h-8 mx-auto mb-4 text-neutral-400" />
                                        <p className="text-sm text-neutral-400 uppercase tracking-widest mb-2">
                                            Upload Cover Letter <span className="text-red-500">*</span>
                                        </p>
                                        <p className="text-xs text-neutral-600">
                                            Click to Browse
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
                                                    {coverLetterFile.name}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCoverLetterFile(null);
                                                if (coverLetterInputRef.current) coverLetterInputRef.current.value = "";
                                            }}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                        >
                                            <X className="w-5 h-5 text-neutral-400 hover:text-white" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Video Upload (Optional) */}
                            <div
                                className={`border border-dashed rounded-xl p-8 transition-colors duration-300 relative border-white/20 hover:border-white/40`}
                                onClick={() => videoInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    className="hidden"
                                    id="video-upload"
                                    ref={videoInputRef}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            handleFileSelect(e.target.files[0], 'video');
                                        }
                                    }}
                                    accept="video/*"
                                />

                                {!videoFile ? (
                                    <div className="text-center cursor-pointer">
                                        <Upload className="w-8 h-8 mx-auto mb-4 text-neutral-400" />
                                        <p className="text-sm text-neutral-400 uppercase tracking-widest mb-2">
                                            Upload Video (Optional)
                                        </p>
                                        <p className="text-xs text-neutral-600">
                                            Click to Browse
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
                                                    {videoFile.name}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setVideoFile(null);
                                                if (videoInputRef.current) videoInputRef.current.value = "";
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
                                <div className="flex items-center space-x-2">
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    <span>{isSubmitting ? "Submitting..." : "Join our team"}</span>
                                </div>
                            </MagneticButton>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
