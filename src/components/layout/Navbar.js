// src/components/layout/Navbar.js
import React from "react";
import { useLocation } from "react-router-dom";
import { Sun, Moon, Bell, Search } from "lucide-react";
import { useApp } from "../../context/AppContext";

const pageTitles = {
  "/dashboard": { title: "Dashboard", sub: "Welcome back! Here's what's happening." },
  "/students": { title: "Students", sub: "Manage your enrolled students" },
  "/teachers": { title: "Teachers", sub: "Manage faculty and teaching staff" },
  "/courses": { title: "Courses", sub: "Create and manage your courses" },
  "/attendance": { title: "Attendance", sub: "Track and manage attendance records" },
};

export default function Navbar() {
  const { state, dispatch } = useApp();
  const location = useLocation();
  const page = pageTitles[location.pathname] || { title: "CoachPro", sub: "" };

  return (
    <header style={{
      padding: "16px 28px",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg-secondary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700 }}>{page.title}</h1>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{page.sub}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Theme toggle */}
        <button
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          className="btn btn-secondary btn-icon"
          title={`Switch to ${state.theme === "dark" ? "light" : "dark"} mode`}
        >
          {state.theme === "dark"
            ? <Sun size={16} color="var(--warning)" />
            : <Moon size={16} />
          }
        </button>

        {/* Notifications */}
        <button className="btn btn-secondary btn-icon" style={{ position: "relative" }}>
          <Bell size={16} />
          <span style={{
            position: "absolute", top: 6, right: 6,
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--danger)",
          }} />
        </button>

        {/* User avatar */}
        {state.user && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
            <div className="avatar">
              {state.user.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ display: "none" }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{state.user.name}</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
