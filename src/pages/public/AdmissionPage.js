// src/pages/public/AdmissionPage.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CheckCircle, ArrowRight, BookOpen, Users, Clock, DollarSign } from "lucide-react";
import toast from "react-hot-toast";

const schema = yup.object({
  studentName: yup.string().min(2, "Min 2 characters").required("Student name is required"),
  dob: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Select gender"),
  currentGrade: yup.string().required("Select current grade"),
  schoolName: yup.string().min(3, "Min 3 characters").required("School name is required"),
  course: yup.string().required("Select a course"),
  parentName: yup.string().min(2).required("Parent name is required"),
  phone: yup.string().matches(/^[6-9]\d{9}$/, "Enter valid 10-digit number").required("Phone is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  address: yup.string().min(10, "Please enter full address").required("Address is required"),
  previousMarks: yup.string().required("Previous academic marks required"),
  howHeard: yup.string().required("Please select how you heard about us"),
});

const courses = [
  { name: "Advanced Mathematics", code: "MATH101", fee: 8000, duration: "6 months", teacher: "Dr. Ramesh Kumar", schedule: "Mon, Wed, Fri", seats: 3 },
  { name: "Science Fundamentals", code: "SCI101", fee: 6500, duration: "4 months", teacher: "Mrs. Sunita Joshi", schedule: "Tue, Thu, Sat", seats: 7 },
  { name: "English Communication", code: "ENG101", fee: 5000, duration: "3 months", teacher: "Mr. Deepak Chauhan", schedule: "Mon, Wed", seats: 5 },
  { name: "Physics Mastery", code: "PHY101", fee: 7500, duration: "5 months", teacher: "Ms. Neha Agarwal", schedule: "Tue, Fri", seats: 8 },
  { name: "Chemistry Lab", code: "CHEM101", fee: 7000, duration: "4 months", teacher: "Mr. Suresh Mehta", schedule: "Mon, Thu, Sat", seats: 2 },
  { name: "Biology & Life Sciences", code: "BIO101", fee: 7200, duration: "5 months", teacher: "Dr. Priya Iyer", schedule: "Wed, Sat", seats: 6 },
];

const steps = [
  { num: "01", title: "Fill Application", desc: "Complete the online form with your details and course preference." },
  { num: "02", title: "Document Upload", desc: "Submit your last report card and identity proof at the office." },
  { num: "03", title: "Assessment Test", desc: "Appear for our free diagnostic test to understand your current level." },
  { num: "04", title: "Confirmation", desc: "Pay the fee and receive your batch schedule and study materials." },
];

export default function AdmissionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedCourse = watch("course");
  const courseDetails = courses.find(c => c.code === selectedCourse);

  const onSubmit = async (data) => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Application submitted successfully!");
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 520 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--success)18", border: "2px solid var(--success)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <CheckCircle size={32} color="var(--success)" />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800, marginBottom: 14 }}>Application Submitted!</h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 28 }}>
            Thank you for applying to CoachPro. We've received your application and will contact you within 2 working days at your registered email and phone number.
          </p>
          <div className="card" style={{ textAlign: "left", marginBottom: 28 }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 12 }}>Next Steps</h4>
            {["Check your email for confirmation", "Bring your last report card to the campus", "Schedule your free diagnostic assessment", "Pay the course fee to confirm your seat"].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <CheckCircle size={15} color="var(--success)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{s}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setSubmitted(false)} className="btn btn-primary" style={{ padding: "12px 28px" }}>
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "64px 24px 48px", background: "var(--bg-primary)", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, marginBottom: 14 }}>
            Apply for <span style={{ background: "linear-gradient(135deg, var(--accent), #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Admission</span>
          </h1>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8 }}>
            Fill in your details below and we'll get back to you within 2 working days. Limited seats available.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section style={{ padding: "40px 24px", background: "var(--bg-secondary)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 900, color: "var(--accent)", opacity: 0.4, lineHeight: 1, flexShrink: 0 }}>{s.num}</div>
              <div>
                <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.title}</h4>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Sidebar */}
      <section style={{ padding: "60px 24px", background: "var(--bg-primary)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>

          {/* Application Form */}
          <div className="card" style={{ padding: "36px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, marginBottom: 28 }}>Application Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              <div>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid var(--border)" }}>Student Information</h3>
                <div className="grid-2" style={{ gap: 16 }}>
                  <div className="input-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="input-label">Full Name of Student *</label>
                    <input className={`input ${errors.studentName ? "input-error" : ""}`} placeholder="Student's full name" {...register("studentName")} />
                    {errors.studentName && <span className="error-text">{errors.studentName.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Date of Birth *</label>
                    <input type="date" className={`input ${errors.dob ? "input-error" : ""}`} {...register("dob")} />
                    {errors.dob && <span className="error-text">{errors.dob.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Gender *</label>
                    <select className={`select ${errors.gender ? "input-error" : ""}`} {...register("gender")}>
                      <option value="">Select gender</option>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                    {errors.gender && <span className="error-text">{errors.gender.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Current Grade *</label>
                    <select className={`select ${errors.currentGrade ? "input-error" : ""}`} {...register("currentGrade")}>
                      <option value="">Select grade</option>
                      {["8th", "9th", "10th", "11th", "12th"].map(g => <option key={g}>{g}</option>)}
                    </select>
                    {errors.currentGrade && <span className="error-text">{errors.currentGrade.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">School Name *</label>
                    <input className={`input ${errors.schoolName ? "input-error" : ""}`} placeholder="Current school name" {...register("schoolName")} />
                    {errors.schoolName && <span className="error-text">{errors.schoolName.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Previous Year Marks (%) *</label>
                    <input className={`input ${errors.previousMarks ? "input-error" : ""}`} placeholder="e.g. 78%" {...register("previousMarks")} />
                    {errors.previousMarks && <span className="error-text">{errors.previousMarks.message}</span>}
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid var(--border)" }}>Course Selection</h3>
                <div className="input-group">
                  <label className="input-label">Select Course *</label>
                  <select className={`select ${errors.course ? "input-error" : ""}`} {...register("course")}>
                    <option value="">Choose a course</option>
                    {courses.map(c => (
                      <option key={c.code} value={c.code}>{c.name} — ₹{c.fee.toLocaleString()} ({c.seats} seats left)</option>
                    ))}
                  </select>
                  {errors.course && <span className="error-text">{errors.course.message}</span>}
                </div>
                {courseDetails && (
                  <div style={{ marginTop: 12, background: "var(--accent)0e", border: "1px solid var(--accent)28", borderRadius: 10, padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {[
                      [BookOpen, "Teacher", courseDetails.teacher],
                      [Clock, "Schedule", courseDetails.schedule],
                      [DollarSign, "Fee", `₹${courseDetails.fee.toLocaleString()}`],
                      [Users, "Duration", courseDetails.duration],
                    ].map(([Icon, label, value]) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Icon size={13} color="var(--accent-light)" />
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{label}:</span>
                        <span style={{ fontSize: 12, fontWeight: 500 }}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid var(--border)" }}>Parent / Guardian Details</h3>
                <div className="grid-2" style={{ gap: 16 }}>
                  <div className="input-group">
                    <label className="input-label">Parent / Guardian Name *</label>
                    <input className={`input ${errors.parentName ? "input-error" : ""}`} placeholder="Full name" {...register("parentName")} />
                    {errors.parentName && <span className="error-text">{errors.parentName.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Mobile Number *</label>
                    <input className={`input ${errors.phone ? "input-error" : ""}`} placeholder="10-digit number" {...register("phone")} />
                    {errors.phone && <span className="error-text">{errors.phone.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Email Address *</label>
                    <input type="email" className={`input ${errors.email ? "input-error" : ""}`} placeholder="email@example.com" {...register("email")} />
                    {errors.email && <span className="error-text">{errors.email.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">How did you hear about us? *</label>
                    <select className={`select ${errors.howHeard ? "input-error" : ""}`} {...register("howHeard")}>
                      <option value="">Select option</option>
                      {["Friend / Family", "Google Search", "Social Media", "Newspaper Ad", "School Notice Board", "Other"].map(o => <option key={o}>{o}</option>)}
                    </select>
                    {errors.howHeard && <span className="error-text">{errors.howHeard.message}</span>}
                  </div>
                  <div className="input-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="input-label">Full Address *</label>
                    <textarea rows={3} className={`input ${errors.address ? "input-error" : ""}`} placeholder="House No., Street, Area, City, Pincode" style={{ resize: "vertical" }} {...register("address")} />
                    {errors.address && <span className="error-text">{errors.address.message}</span>}
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting} style={{ padding: "14px", justifyContent: "center", fontSize: 15, marginTop: 8 }}>
                {submitting ? <><span className="spinner" /> Submitting Application...</> : <>Submit Application <ArrowRight size={16} /></>}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="card">
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Available Courses</h3>
              {courses.map(c => (
                <div key={c.code} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid var(--border-light)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-light)" }}>₹{c.fee.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", gap: 10, fontSize: 11, color: "var(--text-muted)" }}>
                    <span>{c.duration}</span>
                    <span>·</span>
                    <span style={{ color: c.seats <= 3 ? "var(--danger)" : "var(--success)", fontWeight: 600 }}>{c.seats} seats left</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ background: "var(--accent)0e", border: "1px solid var(--accent)28" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Need Help?</h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 14 }}>
                Visit our campus or call us to get assistance with your application.
              </p>
              <div style={{ fontSize: 13, display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ color: "var(--text-secondary)" }}>📞 +91 98765 43210</span>
                <span style={{ color: "var(--text-secondary)" }}>✉️ admissions@coachpro.in</span>
                <span style={{ color: "var(--text-secondary)" }}>🕒 Mon–Sat, 9am–6pm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`@media(max-width:900px){.admission-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}