// src/pages/public/ContactPage.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const schema = yup.object({
  name: yup.string().min(2).required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^[6-9]\d{9}$/, "Enter valid 10-digit number").required("Phone is required"),
  subject: yup.string().required("Please select a subject"),
  message: yup.string().min(20, "Min 20 characters").required("Message is required"),
});

const contactInfo = [
  { icon: MapPin, title: "Visit Us", lines: ["123, Education Hub, Andheri West", "Mumbai, Maharashtra – 400058"], color: "#6366f1" },
  { icon: Phone, title: "Call Us", lines: ["+91 98765 43210", "+91 98765 43211 (Admissions)"], color: "#10b981" },
  { icon: Mail, title: "Email Us", lines: ["hello@coachpro.in", "admissions@coachpro.in"], color: "#f59e0b" },
  { icon: Clock, title: "Working Hours", lines: ["Mon–Saturday: 9:00 AM – 7:00 PM", "Sunday: 10:00 AM – 2:00 PM"], color: "#3b82f6" },
];

const faqs = [
  { q: "What is the batch size for each course?", a: "We keep batches to a maximum of 15 students to ensure every student gets individual attention from the teacher." },
  { q: "Are study materials included in the fee?", a: "Yes, comprehensive study materials, practice sheets, and mock tests are all included in the course fee." },
  { q: "Do you offer online classes?", a: "Yes, we offer hybrid classes. Students can attend in-person or join online sessions through our portal." },
  { q: "What is the refund policy?", a: "Full refund within 7 days of enrollment. 50% refund within 15 days. No refund after 15 days." },
  { q: "How are parent-teacher meetings conducted?", a: "Monthly PTMs are held at our campus. Parents can also schedule one-on-one sessions with teachers anytime." },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
    reset();
    toast.success("Message sent! We'll reply within 24 hours.");
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "64px 24px 48px", background: "var(--bg-primary)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "#3b82f6", opacity: 0.04, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#3b82f618", border: "1px solid #3b82f630", borderRadius: 20, padding: "6px 16px", marginBottom: 22 }}>
            <MessageSquare size={13} color="#3b82f6" />
            <span style={{ fontSize: 12, color: "#3b82f6", fontWeight: 600 }}>We respond within 24 hours</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, marginBottom: 14 }}>
            Get In <span style={{ background: "linear-gradient(135deg, var(--accent), #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Touch</span>
          </h1>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8 }}>
            Have questions about admissions, courses, or anything else? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section style={{ padding: "0 24px 60px", background: "var(--bg-primary)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {contactInfo.map(({ icon: Icon, title, lines, color }) => (
            <div key={title} className="card" style={{ textAlign: "center", padding: "28px 20px" }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <Icon size={20} color={color} />
              </div>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, marginBottom: 10 }}>{title}</h4>
              {lines.map((l, i) => <p key={i} style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{l}</p>)}
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section style={{ padding: "0 24px 72px", background: "var(--bg-primary)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 400px", gap: 32, alignItems: "start" }}>

          {/* Form */}
          <div className="card" style={{ padding: "36px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, marginBottom: 6 }}>Send Us a Message</h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 28 }}>Fill in the form and our team will get back to you promptly.</p>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--success)18", border: "2px solid var(--success)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <CheckCircle size={28} color="var(--success)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 }}>We'll respond to your query within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div className="grid-2" style={{ gap: 16 }}>
                  <div className="input-group">
                    <label className="input-label">Your Name *</label>
                    <input className={`input ${errors.name ? "input-error" : ""}`} placeholder="Full name" {...register("name")} />
                    {errors.name && <span className="error-text">{errors.name.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Phone Number *</label>
                    <input className={`input ${errors.phone ? "input-error" : ""}`} placeholder="10-digit number" {...register("phone")} />
                    {errors.phone && <span className="error-text">{errors.phone.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Email Address *</label>
                    <input type="email" className={`input ${errors.email ? "input-error" : ""}`} placeholder="you@example.com" {...register("email")} />
                    {errors.email && <span className="error-text">{errors.email.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Subject *</label>
                    <select className={`select ${errors.subject ? "input-error" : ""}`} {...register("subject")}>
                      <option value="">Choose a topic</option>
                      {["Admission Enquiry", "Course Information", "Fee Structure", "Batch Schedule", "Feedback / Complaint", "Partnership", "Other"].map(o => <option key={o}>{o}</option>)}
                    </select>
                    {errors.subject && <span className="error-text">{errors.subject.message}</span>}
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Your Message *</label>
                  <textarea rows={5} className={`input ${errors.message ? "input-error" : ""}`} placeholder="Tell us how we can help you..." style={{ resize: "vertical" }} {...register("message")} />
                  {errors.message && <span className="error-text">{errors.message.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting} style={{ padding: "13px", justifyContent: "center", fontSize: 15 }}>
                  {submitting ? <><span className="spinner" /> Sending...</> : <>Send Message <ArrowRight size={15} /></>}
                </button>
              </form>
            )}
          </div>

          {/* Info Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Map placeholder */}
            <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border)", height: 220, background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
              <MapPin size={28} color="var(--accent)" />
              <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center" }}>123, Education Hub<br />Andheri West, Mumbai</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">View on Maps</a>
            </div>

            <div className="card">
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Quick Connect</h3>
              {[
                { label: "WhatsApp", val: "+91 98765 43210", href: "https://wa.me/919876543210", color: "#25d366" },
                { label: "Call Now", val: "+91 98765 43211", href: "tel:+919876543211", color: "#3b82f6" },
                { label: "Email", val: "hello@coachpro.in", href: "mailto:hello@coachpro.in", color: "#f59e0b" },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 8, background: `${c.color}10`, border: `1px solid ${c.color}25`, marginBottom: 8, textDecoration: "none", transition: "var(--transition)" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: c.color }}>{c.label}</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.val}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "60px 24px 72px", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, marginBottom: 10 }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Find quick answers to common questions</p>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} style={{ marginBottom: 10, border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: openFaq === i ? "var(--accent)0e" : "var(--bg-card)", border: "none", cursor: "pointer", textAlign: "left", transition: "var(--transition)" }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{faq.q}</span>
                <span style={{ fontSize: 18, color: "var(--accent)", transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 12 }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 20px 16px", background: "var(--bg-card)" }}>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}