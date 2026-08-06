// src/components/common/StatCard.js
import React from "react";

export default function StatCard({ title, value, subtitle, icon: Icon, color = "#6366f1", trend }) {
  return (
    <div className="stat-card" style={{ "--card-color": color }}>
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 80, height: 80, borderRadius: "50%",
        background: color, opacity: 0.08,
        transform: "translate(20px, -20px)",
      }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, marginTop: 6, lineHeight: 1 }}>{value}</p>
          {subtitle && <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 6 }}>{subtitle}</p>}
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: `${color}22`,
          border: `1px solid ${color}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon size={20} color={color} />
        </div>
      </div>
      {trend !== undefined && (
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 12, color: trend >= 0 ? "var(--success)" : "var(--danger)", fontWeight: 600 }}>
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
          </span>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>vs last month</span>
        </div>
      )}
    </div>
  );
}
