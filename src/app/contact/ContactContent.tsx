"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getWhatsAppUrl } from "@/lib/utils";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export default function ContactContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "SEO",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setResponseMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setResponseMsg(resData.message || "Message sent successfully!");
        reset();
      } else {
        setSubmitStatus("error");
        setResponseMsg(resData.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setResponseMsg("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      {/* Background orbs */}
      <div className="orb orb-teal w-96 h-96 -top-48 -right-24 opacity-10" />
      <div className="orb orb-cyan w-72 h-72 bottom-12 -left-36 opacity-8" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          tag="Get In Touch"
          title={<>Let&apos;s Build Something <span className="gradient-text">Remarkable</span></>}
          subtitle="Have a project in mind or want to grow your search visibility? Send us a message or chat with us on WhatsApp. We get back to you within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="left" delay={0.1}>
              <div className="card h-full space-y-8 bg-navy-900/60 border border-white/5 backdrop-blur-sm p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white font-heading mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500/10 text-teal-500 shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Our Location</h4>
                      <p className="text-slate-400 text-sm mt-1">Lahore, Pakistan</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500/10 text-teal-500 shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">WhatsApp & Call</h4>
                      <a
                        href="https://wa.me/923224044150"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-teal-400 text-sm mt-1 block"
                      >
                        +92 (322) 404-4150
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500/10 text-teal-500 shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Email Us</h4>
                      <a
                        href="mailto:info@ranknexai.com"
                        className="text-slate-400 hover:text-teal-400 text-sm mt-1 block"
                      >
                        info@ranknexai.com
                      </a>
                    </div>
                  </div>
                </div>

                <hr className="border-white/5 my-8" />

                {/* WhatsApp Instant CTA */}
                <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
                  <div className="flex justify-center mb-3 text-emerald-400">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h4 className="text-white font-bold font-heading mb-2">Need a faster response?</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Chat with our growth consultant instantly on WhatsApp.
                  </p>
                  <a
                    href={getWhatsAppUrl("Hello RankNex AI, I'd like to ask about your services.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#20ba59] transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="card bg-navy-900/60 border border-white/5 backdrop-blur-sm p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white font-heading mb-6">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        className={`w-full bg-navy-950 border rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                          errors.name ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-teal-500"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                            message: "Please enter a valid email address",
                          },
                        })}
                        className={`w-full bg-navy-950 border rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                          errors.email ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-teal-500"
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-300 mb-2">
                        Phone Number <span className="text-slate-500">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register("phone")}
                        className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                        placeholder="+92 300 1234567"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-slate-300 mb-2">
                        Company Name <span className="text-slate-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        {...register("company")}
                        className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                        placeholder="Your Company LLC"
                      />
                    </div>
                  </div>

                  {/* Service Dropdown */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-slate-300 mb-2">
                      Which Service Are You Interested In? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      {...register("service", { required: "Please select a service" })}
                      className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-slate-300 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="SEO">Search Engine Optimization (SEO)</option>
                      <option value="Social Media">Social Media Marketing (SMM)</option>
                      <option value="PPC Advertising">PPC & Google Ads</option>
                      <option value="Content Writing">Content Writing & Strategy</option>
                      <option value="Web Design & Development">Web Design & Development</option>
                      <option value="Branding">Brand Identity & Design</option>
                      <option value="Other">Other / General Inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register("message", { required: "Message is required" })}
                      className={`w-full bg-navy-950 border rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                        errors.message ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-teal-500"
                      }`}
                      placeholder="Tell us about your project, goals, and any questions you have..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submission Status Alerts */}
                  {submitStatus === "success" && (
                    <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <p>{responseMsg}</p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>{responseMsg}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Free SEO Audit Banner */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-teal-500/10 via-navy-900/60 to-cyan-500/10 p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-white mb-4">
              Get Your <span className="gradient-text">Free SEO Audit</span> Today
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto mb-6 text-sm md:text-base">
              Wondering why your site isn&apos;t getting traffic? Let our digital audit team run a full diagnostic scan on your website&apos;s speed, mobile responsiveness, and keyword issues.
            </p>
            <a
              href={getWhatsAppUrl("Hello, I'd like to get a free SEO audit for my website: ")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <span>Get Free Audit via WhatsApp</span>
              <TrendingUp className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
