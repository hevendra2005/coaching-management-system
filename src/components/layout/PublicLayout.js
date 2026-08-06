// src/components/layout/PublicLayout.js
import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Sparkles, Menu, X, Sun, Moon } from "lucide-react";
import { useApp } from "../../context/AppContext";

const navLinks = [
  { path: "/home", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/admission", label: "Admission" },
  { path: "/contact", label: "Contact" },
];

export default function PublicLayout() {
  const { state, dispatch } = useApp();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-primary)" }}>
      {/* Navbar */}
      <header style={{
        position: "sticky", top: 0, zIndex: 200,
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, var(--accent), #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={16} color="white" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-primary)" }}>CoachPro</span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} style={{
                padding: "7px 16px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 500,
                color: location.pathname === link.path ? "var(--accent-light)" : "var(--text-secondary)",
                background: location.pathname === link.path ? "var(--accent)18" : "transparent",
                transition: "var(--transition)",
              }}
                onMouseEnter={e => { if (location.pathname !== link.path) e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseLeave={e => { if (location.pathname !== link.path) e.currentTarget.style.color = "var(--text-secondary)"; }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => dispatch({ type: "TOGGLE_THEME" })} className="btn btn-secondary btn-icon" style={{ borderRadius: 8 }}>
              {state.theme === "dark" ? <Sun size={15} color="var(--warning)" /> : <Moon size={15} />}
            </button>
            <Link to="/login" className="btn btn-secondary" style={{ fontSize: 13 }}>Login</Link>
            <Link to="/admission" className="btn btn-primary" style={{ fontSize: 13 }}>Apply Now</Link>
            <button className="btn btn-secondary btn-icon mobile-menu-btn" onClick={() => setMenuOpen(o => !o)} style={{ display: "none" }}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", padding: 16 }}>
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)} style={{
                display: "block", padding: "10px 16px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 500,
                color: location.pathname === link.path ? "var(--accent-light)" : "var(--text-secondary)",
                background: location.pathname === link.path ? "var(--accent)14" : "transparent",
                marginBottom: 4,
              }}>{link.label}</Link>
            ))}
          </div>
        )}
      </header>

      {/* Page content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)", padding: "48px 24px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, var(--accent), #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Sparkles size={14} color="white" />
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16 }}>CoachPro</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 220 }}>
                Empowering students with quality education since 2010. Your success is our mission.
              </p>
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, marginBottom: 14, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Quick Links</h4>
              {navLinks.map(l => <Link key={l.path} to={l.path} style={{ display: "block", fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 8, transition: "var(--transition)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--accent-light)"} onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>{l.label}</Link>)}
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, marginBottom: 14, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Courses</h4>
              {["Mathematics", "Physics", "Chemistry", "English", "Science"].map(c => (
                <p key={c} style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>{c}</p>
              ))}
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, marginBottom: 14, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Contact</h4>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>📍 123, Education Hub, Mumbai</p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>📞 +91 98765 43210</p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>✉️ hello@coachpro.in</p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>© 2025 CoachPro. All rights reserved.</p>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Built with ❤️ for students</p>
          </div>
        </div>
      </footer>

      <style>{`
        @media(max-width:768px){
          .desktop-nav{display:none!important}
          .mobile-menu-btn{display:flex!important}
        }
      `}</style>
    </div>
  );
}