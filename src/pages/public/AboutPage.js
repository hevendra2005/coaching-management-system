// src/pages/public/AboutPage.js
import React from "react";
import { Link } from "react-router-dom";
import { Target, Heart, Zap, Users, Award, BookOpen, ArrowRight } from "lucide-react";

const team = [
  { name: "Dr. Ramesh Kumar", role: "Mathematics", exp: "8 yrs", initials: "RK", color: "#6366f1", bio: "IIT Delhi alumnus with a passion for making complex math simple and approachable for all students." },
  { name: "Mrs. Sunita Joshi", role: "Science", exp: "5 yrs", initials: "SJ", color: "#10b981", bio: "MSc in Physics from Mumbai University. Known for her engaging lab demonstrations and conceptual clarity." },
  { name: "Mr. Deepak Chauhan", role: "English", exp: "10 yrs", initials: "DC", color: "#f59e0b", bio: "MA in English Literature. Helps students excel in reading, writing, and communication skills." },
  { name: "Ms. Neha Agarwal", role: "Physics", exp: "6 yrs", initials: "NA", color: "#3b82f6", bio: "Former ISRO researcher who brings real-world science into the classroom." },
  { name: "Mr. Suresh Mehta", role: "Chemistry", exp: "12 yrs", initials: "SM", color: "#8b5cf6", bio: "PhD in Organic Chemistry. Simplifies reactions and mechanisms so every student gets it." },
  { name: "Dr. Priya Iyer", role: "Biology", exp: "9 yrs", initials: "PI", color: "#ec4899", bio: "MBBS graduate who transitioned to teaching to inspire the next generation of doctors." },
];

const values = [
  { icon: Target, title: "Excellence", desc: "We hold ourselves and our students to the highest academic standards, always pushing for the best.", color: "#6366f1" },
  { icon: Heart, title: "Compassion", desc: "We understand every student is unique. Patient, supportive teaching is at the heart of everything we do.", color: "#ef4444" },
  { icon: Zap, title: "Innovation", desc: "From digital resources to interactive sessions, we use modern methods to make learning effective and fun.", color: "#f59e0b" },
  { icon: Users, title: "Community", desc: "CoachPro is more than a coaching institute — it's a community where students support and inspire each other.", color: "#10b981" },
];

const milestones = [
  { year: "2010", title: "Founded", desc: "Started with 3 teachers and 45 students in a small classroom in Andheri." },
  { year: "2014", title: "1,000 Students", desc: "Crossed 1,000 enrolled students. Expanded to a larger campus with modern facilities." },
  { year: "2018", title: "Digital Expansion", desc: "Launched online learning tools and a student portal for remote access to study materials." },
  { year: "2021", title: "Award Winning", desc: "Received the 'Best Coaching Institute' award by the Mumbai Education Board for 3 consecutive years." },
  { year: "2024", title: "2,500+ Strong", desc: "Today we serve over 2,500 students with 50+ expert faculty across multiple campuses." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "80px 24px 60px", background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "#10b981", opacity: 0.04, filter: "blur(90px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#10b98118", border: "1px solid #10b98130", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
              <Award size={13} color="#10b981" />
              <span style={{ fontSize: 12, color: "#10b981", fontWeight: 600 }}>Established 2010 · Mumbai's Trusted Institute</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
              About <span style={{ background: "linear-gradient(135deg, var(--accent), #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CoachPro</span>
            </h1>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 32 }}>
              For over a decade, CoachPro has been the academic backbone for thousands of students across Mumbai.
              We combine rigorous academic preparation with a nurturing environment to help every student reach their full potential.
            </p>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {[["14+", "Years of Excellence"], ["2,500+", "Students Graduated"], ["95%", "Board Exam Success"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800, color: "var(--accent-light)" }}>{v}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "72px 24px", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          <div className="card" style={{ borderLeft: "3px solid var(--accent)", padding: "32px" }}>
            <Target size={24} color="var(--accent)" style={{ marginBottom: 14 }} />
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Our Mission</h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8 }}>
              To provide affordable, high-quality coaching that empowers students from all backgrounds to achieve academic excellence and secure admissions to top institutions.
            </p>
          </div>
          <div className="card" style={{ borderLeft: "3px solid #10b981", padding: "32px" }}>
            <Zap size={24} color="#10b981" style={{ marginBottom: 14 }} />
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Our Vision</h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8 }}>
              To be India's most trusted coaching network — where every student finds a teacher who believes in them, a curriculum that challenges them, and a community that uplifts them.
            </p>
          </div>
          <div className="card" style={{ borderLeft: "3px solid #f59e0b", padding: "32px" }}>
            <BookOpen size={24} color="#f59e0b" style={{ marginBottom: 14 }} />
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Our Approach</h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8 }}>
              Small batch sizes of max 15 students ensure every child gets individual attention. Regular assessments, detailed feedback, and parent engagement are core to how we teach.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "72px 24px", background: "var(--bg-primary)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, marginBottom: 12 }}>Our Core Values</h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>The principles that guide everything we do at CoachPro</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card" style={{ textAlign: "center", padding: "32px 24px" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                  <Icon size={22} color={color} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "72px 24px", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, marginBottom: 12 }}>Our Journey</h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>From humble beginnings to Mumbai's top coaching institute</p>
          </div>
          <div style={{ position: "relative", paddingLeft: 40 }}>
            <div style={{ position: "absolute", left: 16, top: 0, bottom: 0, width: 2, background: "var(--border)" }} />
            {milestones.map((m, i) => (
              <div key={m.year} style={{ position: "relative", marginBottom: 36 }}>
                <div style={{ position: "absolute", left: -31, top: 4, width: 14, height: 14, borderRadius: "50%", background: "var(--accent)", border: "3px solid var(--bg-secondary)", zIndex: 1 }} />
                <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 800, color: "var(--accent-light)", background: "var(--accent)18", padding: "2px 10px", borderRadius: 20 }}>{m.year}</span>
                    <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>{m.title}</h4>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "72px 24px", background: "var(--bg-primary)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, marginBottom: 12 }}>Meet Our Faculty</h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Passionate educators dedicated to your success</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {team.map(t => (
              <div key={t.name} className="card">
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "white", fontFamily: "var(--font-display)", flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 11, marginTop: 3, display: "flex", gap: 6 }}>
                      <span className="badge badge-info">{t.role}</span>
                      <span style={{ color: "var(--text-muted)" }}>{t.exp} exp</span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 24px", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, marginBottom: 14 }}>Join the CoachPro Family</h2>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 28, lineHeight: 1.7 }}>
            Be part of a legacy of academic excellence. Applications are now open for the upcoming batch.
          </p>
          <Link to="/admission" className="btn btn-primary" style={{ padding: "13px 28px", fontSize: 15, borderRadius: 10 }}>
            Apply Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}