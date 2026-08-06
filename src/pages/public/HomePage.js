// src/pages/public/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Star, Users, BookOpen, Award, CheckCircle,
  GraduationCap, TrendingUp, Clock, Shield
} from "lucide-react";

const stats = [
  { value: "2,500+", label: "Students Enrolled", icon: GraduationCap, color: "#6366f1" },
  { value: "95%", label: "Success Rate", icon: TrendingUp, color: "#10b981" },
  { value: "50+", label: "Expert Teachers", icon: Users, color: "#f59e0b" },
  { value: "30+", label: "Courses Offered", icon: BookOpen, color: "#3b82f6" },
];

const features = [
  { icon: Award, title: "Expert Faculty", desc: "Highly qualified teachers with 5–15 years of experience in their respective subjects.", color: "#6366f1" },
  { icon: Clock, title: "Flexible Batches", desc: "Morning, afternoon and evening batches available. Weekend classes for working students.", color: "#10b981" },
  { icon: Shield, title: "Proven Results", desc: "Over 95% of our students score above 85% in board exams. Track record since 2010.", color: "#f59e0b" },
  { icon: TrendingUp, title: "Progress Tracking", desc: "Regular tests, detailed reports, and parent-teacher meetings to monitor progress.", color: "#ef4444" },
];

const courses = [
  { name: "Advanced Mathematics", teacher: "Dr. Ramesh Kumar", students: 24, duration: "6 months", fee: "₹8,000", color: "#6366f1" },
  { name: "Science Fundamentals", teacher: "Mrs. Sunita Joshi", students: 18, duration: "4 months", fee: "₹6,500", color: "#10b981" },
  { name: "English Communication", teacher: "Mr. Deepak Chauhan", students: 30, duration: "3 months", fee: "₹5,000", color: "#f59e0b" },
  { name: "Physics Mastery", teacher: "Ms. Neha Agarwal", students: 15, duration: "5 months", fee: "₹7,500", color: "#3b82f6" },
  { name: "Chemistry Lab", teacher: "Mr. Suresh Mehta", students: 22, duration: "4 months", fee: "₹7,000", color: "#8b5cf6" },
  { name: "Biology & Life Sciences", teacher: "Dr. Priya Iyer", students: 19, duration: "5 months", fee: "₹7,200", color: "#ec4899" },
];

const testimonials = [
  { name: "Aarav Sharma", grade: "Class 12", text: "CoachPro helped me score 96% in boards. The teachers here are extraordinary and always available for doubt sessions.", rating: 5 },
  { name: "Priya Patel", grade: "Class 11", text: "The study material and mock tests prepared me really well. I got into my dream college thanks to the coaching here.", rating: 5 },
  { name: "Rohan Verma", grade: "Class 10", text: "Best coaching institute in the city. Small batch sizes mean every student gets personal attention from teachers.", rating: 5 },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: "80px 24px 100px",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "var(--accent)", opacity: 0.05, filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "#8b5cf6", opacity: 0.04, filter: "blur(120px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--accent)18", border: "1px solid var(--accent)30", borderRadius: 20, padding: "6px 16px", marginBottom: 28 }}>
            <Star size={13} color="var(--warning)" fill="var(--warning)" />
            <span style={{ fontSize: 12, color: "var(--accent-light)", fontWeight: 600 }}>Trusted by 2,500+ students across Mumbai</span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 800, lineHeight: 1.1, marginBottom: 24,
            color: "var(--text-primary)",
          }}>
            Unlock Your Academic<br />
            <span style={{ background: "linear-gradient(135deg, var(--accent), #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Potential with CoachPro
            </span>
          </h1>

          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "var(--text-secondary)", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Expert coaching for Classes 8–12. Small batches, personalised attention, and a 95% success rate.
            Join thousands of students who achieved their dreams with us.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/admission" className="btn btn-primary" style={{ padding: "14px 28px", fontSize: 15, borderRadius: 10 }}>
              Apply for Admission <ArrowRight size={17} />
            </Link>
            <Link to="/about" className="btn btn-secondary" style={{ padding: "14px 28px", fontSize: 15, borderRadius: 10 }}>
              Learn More
            </Link>
          </div>

          {/* Stats bar */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
            background: "var(--border)", borderRadius: 16, overflow: "hidden",
            marginTop: 72, border: "1px solid var(--border)",
          }}>
            {stats.map(({ value, label, icon: Icon, color }) => (
              <div key={label} style={{ background: "var(--bg-card)", padding: "28px 20px", textAlign: "center" }}>
                <Icon size={22} color={color} style={{ marginBottom: 10 }} />
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: "var(--text-primary)" }}>{value}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "80px 24px", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, marginBottom: 14 }}>
              Why Choose CoachPro?
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto" }}>
              We combine expert teaching with modern methods to deliver outstanding results.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card" style={{ textAlign: "left" }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: `${color}18`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <Icon size={22} color={color} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section style={{ padding: "80px 24px", background: "var(--bg-primary)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, marginBottom: 10 }}>Our Courses</h2>
              <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Expert-led courses for competitive exams and board preparation</p>
            </div>
            <Link to="/admission" className="btn btn-primary">Enroll Now <ArrowRight size={15} /></Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {courses.map(c => (
              <div key={c.name} className="card" style={{ borderLeft: `3px solid ${c.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>{c.name}</h3>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: c.color }}>{c.fee}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>by {c.teacher}</p>
                <div style={{ display: "flex", gap: 16 }}>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                    <Users size={12} /> {c.students} students
                  </span>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={12} /> {c.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "80px 24px", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, marginBottom: 12 }}>Student Success Stories</h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Hear from our students who transformed their academic journey</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} className="card">
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={14} color="var(--warning)" fill="var(--warning)" />)}
                </div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="avatar" style={{ width: 36, height: 36, fontSize: 13 }}>{t.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{t.grade}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "var(--bg-primary)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ background: "linear-gradient(135deg, var(--accent)18, #8b5cf618)", border: "1px solid var(--accent)30", borderRadius: 24, padding: "60px 40px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 800, marginBottom: 16 }}>
              Ready to Begin Your Journey?
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.7 }}>
              Limited seats available for the upcoming batch. Apply today and take the first step towards academic excellence.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/admission" className="btn btn-primary" style={{ padding: "13px 28px", fontSize: 15, borderRadius: 10 }}>
                Apply for Admission <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-secondary" style={{ padding: "13px 28px", fontSize: 15, borderRadius: 10 }}>
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}