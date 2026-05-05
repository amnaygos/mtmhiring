"use client";

import { FluidInput } from "../ui/fluid-input";
import { FluidSelect } from "../ui/fluid-select";
import { MagneticButton } from "../ui/magnetic-button";
import { motion } from "framer-motion";
import { Upload, X, File, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

const noteChoices = [
    { label: "I am a Manager with over 4 years of experience in the fitness and wellness sector", value: "I am a Manager with over 4 years of experience in the fitness and wellness sector" },
    { label: "I am a certified Personal Trainer with over 3 years of experience", value: "I am a certified Personal Trainer with over 3 years of experience" },
    { label: "I am a qualified Group Exercise Instructor", value: "I am a qualified Group Exercise Instructor" },
];

export function UnifiedSection() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        applicant_name: "",
        email_id: "",
        phone_number: "",
        notes: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleFileSelect = (selectedFile: File) => {
        const MAX_FILE_SIZE = 100 * 1024 * 1024;
        if (selectedFile.size > MAX_FILE_SIZE) {
            setError("File exceeds the maximum limit of 100MB.");
            return;
        }
        setFile(selectedFile);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.applicant_name || !formData.email_id || !file) {
            setError("Name, Email, and CV are required.");
            return;
        }

        setIsSubmitting(true);

        try {
            const apiFormData = new FormData();
            apiFormData.append("cv_attach", file);
            apiFormData.append("applicant_name", formData.applicant_name);
            apiFormData.append("email_id", formData.email_id);
            apiFormData.append("phone_number", formData.phone_number);
            apiFormData.append("notes", formData.notes);
            apiFormData.append("job_title", "HR-OPN-2026-0002"); // Keeping the job title from before

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

            // Trigger Meta Pixel Lead Event
            if (typeof window !== "undefined" && (window as any).fbq) {
                (window as any).fbq('track', 'Lead');
            }

            setIsSuccess(true);
            setFormData({ applicant_name: "", email_id: "", phone_number: "", notes: "" });
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-black px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-8"
                >
                    <div className="flex justify-center">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                            <CheckCircle2 className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-[0.2em]">Application Received</h2>
                        <p className="text-neutral-400 text-lg max-w-md mx-auto font-light">
                            Your journey with MTM Group starts here. We will review your profile and contact you soon.
                        </p>
                    </div>
                    <MagneticButton onClick={() => setIsSuccess(false)} className="px-12">
                        Back to Home
                    </MagneticButton>
                </motion.div>
            </section>
        );
    }

    return (
        <section className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                
                {/* Content Side */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="space-y-6">
                        <motion.img
                            src="/logo.png"
                            alt="MTM Group"
                            className="h-12 w-auto mb-8 opacity-80"
                        />
                        <h1 className="text-4xl md:text-6xl font-thin uppercase tracking-[0.1em] leading-tight">
                            Elite <span className="font-normal text-white/90">Fitness</span> <br /> 
                            Careers in <span className="font-normal text-white/90">Qatar</span>
                        </h1>
                        <div className="space-y-4">
                            <p className="text-xl md:text-2xl text-white font-medium tracking-wide">
                                Earn up to 17,000 QAR per month.
                            </p>
                            <p className="text-lg text-neutral-400 font-light max-w-xl leading-relaxed">
                                Join MTM Group and lead the next era of fitness in Doha. We are looking for world-class instructors to join our premier team.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <h3 className="text-white uppercase tracking-widest text-sm font-bold">The Opportunity</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Lead high-octane sessions in a dynamic environment that celebrates pure intensity and growth.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-white uppercase tracking-widest text-sm font-bold">Relocation</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Fully sponsored visa, flights, and transition support. We handle the logistics; you bring the talent.
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                        <div className="flex items-center space-x-4 text-white/40">
                            <ArrowRight className="w-5 h-5" />
                            <span className="text-sm uppercase tracking-[0.2em] font-light">Join the MTM Legacy</span>
                        </div>
                    </div>
                </motion.div>

                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-neutral-900/50 backdrop-blur-xl p-8 md:p-12 border border-white/5 relative shadow-2xl rounded-2xl"
                >
                    <div className="mb-10">
                        <h2 className="text-3xl font-thin uppercase tracking-[0.15em] text-white">Join the Elite</h2>
                        <p className="text-neutral-500 text-sm mt-2 uppercase tracking-widest font-medium">Elevate your future starting today.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <FluidInput
                            label="Full Name"
                            id="applicant_name"
                            required
                            value={formData.applicant_name}
                            onChange={handleInputChange}
                        />
                        
                        <FluidInput
                            label="Email Address"
                            id="email_id"
                            type="email"
                            required
                            value={formData.email_id}
                            onChange={handleInputChange}
                        />

                        <FluidInput
                            label="Phone Number"
                            id="phone_number"
                            type="tel"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                        />

                        <FluidSelect
                            label="Your Professional Experience"
                            id="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            options={noteChoices}
                        />

                        <div className="space-y-4">
                            <div
                                className={cn(
                                    "border border-dashed rounded-lg p-6 transition-all duration-300 cursor-pointer text-center",
                                    file ? "border-white/40 bg-white/5" : "border-white/20 hover:border-white/30"
                                )}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                                    accept=".pdf,.doc,.docx"
                                />
                                {!file ? (
                                    <div className="space-y-2">
                                        <Upload className="w-6 h-6 mx-auto text-neutral-400" />
                                        <p className="text-xs uppercase tracking-widest text-neutral-300">Upload CV (PDF/Word)</p>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3 text-left">
                                        <File className="w-5 h-5 text-white" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-white truncate">{file.name}</p>
                                            <p className="text-[10px] text-neutral-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                            className="p-1 hover:bg-white/10 rounded"
                                        >
                                            <X className="w-4 h-4 text-neutral-500" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-xs">{error}</p>}

                        <MagneticButton 
                            className="w-full" 
                            disabled={isSubmitting}
                        >
                            <span className="flex items-center justify-center space-x-2">
                                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
                            </span>
                        </MagneticButton>
                    </form>
                </motion.div>

            </div>
        </section>
    );
}
