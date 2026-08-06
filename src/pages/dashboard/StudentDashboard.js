// src/pages/dashboard/StudentDashboard.js
import React from "react";
import { BookOpen, CheckCircle, Clock, TrendingUp, Star, Bell, Calendar } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import StatCard from "../../components/common/StatCard";

const studentAttendanceData = [
  { month: "Aug", present: 20, total: 22 },
  { month: "Sep", present: 18, total: 20 },
  { month: "Oct", present: 22, total: 24 },
  { month: "Nov", present: 19, total: 22 },
  { month: "Dec", present: 21, total: 23 },
];

const studentTestScores = [
  { test: "Unit 1", score: 72 }, { test: "Unit 2", score: 78 },
  { test: "Unit 3", score: 85 }, { test: "Unit 4", score: 80 },
  { test: "Mid-Term", score: 88 }, { test: "Unit 5", score: 91 },
];

const upcomingClasses = [
  { subject: "Mathematics", teacher: "Dr. Ramesh Kumar", time: "Today, 4:00 PM", room: "Room 3A", color: "#6366f1" },
  { subject: "Science", teacher: "Mrs. Sunita Joshi", time: "Tomorrow, 5:00 PM", room: "Room 2B", color: "#10b981" },
  { subject: "English", teacher: "Mr. Deepak Chauhan", time: "Wed, 3:30 PM", room: "Room 1C", color: "#f59e0b" },
];

const announcements = [
  { text: "Unit 5 test scheduled for Saturday, 28 Dec at 10 AM.", time: "2 hours ago", type: "warning" },
  { text: "Holiday on 25th December. No classes.", time: "1 day ago", type: "info" },
  { text: "Study materials for Chapter 6 uploaded to portal.", time: "2 days ago", type: "success" },
];

export default function StudentDashboard() {
  const { state } = useApp();
  const student = state.students.find(s => s.email === state.user?.email) || state.students[0];

  const attendancePct = Math.round((studentAttendanceData.reduce((a, d) => a + d.present, 0) / studentAttendanceData.reduce((a, d) => a + d.total, 0)) * 100);
  const avgScore = Math.round(studentTestScores.reduce((a, d) => a + d.score, 0) / studentTestScores.length);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px" }}>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>{label}</p>
        {payload.map((p, i) => <p key={i} style={{ fontSize: 13, fontWeight: 600, color: p.color }}>{p.value} {p.name}</p>)}
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Welcome Banner */}
      <div style={{
        background: "linear-gradient(135deg, var(--accent)28, #8b5cf618)",
        border: "1px solid var(--accent)30",
        borderRadius: "var(--radius-lg)",
        padding: "24px 28px",
        marginBottom: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="avatar avatar-lg" style={{ fontSize: 18 }}>{state.user?.name?.charAt(0)}</div>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800 }}>Welcome back, {state.user?.name?.split(" ")[0]}! 👋</h2>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>
              Enrolled in: <strong style={{ color: "var(--accent-light)" }}>{student?.course || "Mathematics"}</strong> · Grade {student?.grade || "11th"}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ textAlign: "center", background: "var(--bg-card)", borderRadius: 10, padding: "10px 18px", border: "1px solid var(--border)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--success)" }}>{attendancePct}%</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Attendance</div>
          </div>
          <div style={{ textAlign: "center", background: "var(--bg-card)", borderRadius: 10, padding: "10px 18px", border: "1px solid var(--border)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--warning)" }}>{avgScore}%</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Avg Score</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <StatCard title="Attendance" value={`${attendancePct}%`} subtitle="This semester" icon={CheckCircle} color="#10b981" trend={4} />
        <StatCard title="Avg Test Score" value={`${avgScore}%`} subtitle="Last 6 tests" icon={TrendingUp} color="#6366f1" trend={8} />
        <StatCard title="Classes Left" value="14" subtitle="This month" icon={BookOpen} color="#f59e0b" />
        <StatCard title="Rank in Batch" value="#3" subtitle="Out of 24 students" icon={Star} color="#ef4444" />
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Test score chart */}
        <div className="card">
          <div style={{ marginBottom: 18 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>My Test Performance</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Score trend across recent tests</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={studentTestScores}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="test" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2.5} fill="url(#scoreGrad)" name="score" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance chart */}
        <div className="card">
          <div style={{ marginBottom: 18 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Monthly Attendance</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Classes attended vs total</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={studentAttendanceData}>
              <defs>
                <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2.5} fill="url(#attGrad)" name="present" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Upcoming classes */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Upcoming Classes</h3>
            <Calendar size={16} color="var(--accent-light)" />
          </div>
          {upcomingClasses.map((cls, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < upcomingClasses.length - 1 ? "1px solid var(--border-light)" : "none" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${cls.color}18`, border: `1px solid ${cls.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <BookOpen size={16} color={cls.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{cls.subject}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{cls.teacher} · {cls.room}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: cls.color }}>{cls.time.split(",")[0]}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{cls.time.split(",")[1]}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Announcements */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Announcements</h3>
            <Bell size={16} color="var(--warning)" />
          </div>
          {announcements.map((a, i) => {
            const colorMap = { warning: "var(--warning)", info: "var(--info)", success: "var(--success)" };
            const c = colorMap[a.type];
            return (
              <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < announcements.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, marginTop: 5, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.5 }}>{a.text}</p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{a.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* My Courses */}
      <div className="card">
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 18 }}>My Enrolled Courses</h3>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr><th>Course</th><th>Teacher</th><th>Schedule</th><th>Duration</th><th>Status</th></tr></thead>
            <tbody>
              {state.courses.filter(c => c.status === "active").slice(0, 3).map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.code}</div>
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 13 }}>{c.teacher}</td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 13 }}>{c.schedule}</td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 13 }}><Clock size={12} style={{ marginRight: 4, display: "inline" }} />{c.duration}</td>
                  <td><span className="badge badge-success">Enrolled</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}