// src/pages/dashboard/TeacherDashboard.js
import React from "react";
import { Users, BookOpen, CheckCircle, ClipboardList, TrendingUp, Calendar, Bell } from "lucide-react";
import { useApp } from "../../context/AppContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import StatCard from "../../components/common/StatCard";

const classPerformance = [
  { name: "Aarav S.", score: 88 }, { name: "Priya P.", score: 76 },
  { name: "Rohan V.", score: 65 }, { name: "Sneha G.", score: 91 },
  { name: "Vikram S.", score: 82 }, { name: "Ananya I.", score: 95 },
  { name: "Arjun N.", score: 74 }, { name: "Kavya R.", score: 69 },
];

const weeklyAttendance = [
  { day: "Mon", present: 12, absent: 2 }, { day: "Tue", present: 14, absent: 0 },
  { day: "Wed", present: 11, absent: 3 }, { day: "Thu", present: 13, absent: 1 },
  { day: "Fri", present: 10, absent: 4 },
];

const testResultsDist = [
  { name: "90–100%", value: 3, color: "#10b981" },
  { name: "75–89%", value: 6, color: "#6366f1" },
  { name: "60–74%", value: 4, color: "#f59e0b" },
  { name: "Below 60%", value: 2, color: "#ef4444" },
];

const todaySchedule = [
  { time: "10:00 AM", course: "Advanced Mathematics", batch: "Batch A", room: "Room 3A", students: 14 },
  { time: "12:30 PM", course: "Advanced Mathematics", batch: "Batch B", room: "Room 3A", students: 12 },
  { time: "4:00 PM", course: "Mathematics (Revision)", batch: "Class 10", room: "Room 1B", students: 8 },
];

const pendingTasks = [
  { task: "Grade Unit 5 test papers", due: "Today", priority: "high" },
  { task: "Upload Chapter 7 notes", due: "Tomorrow", priority: "medium" },
  { task: "Parent-teacher meeting prep", due: "Fri 27 Dec", priority: "medium" },
  { task: "Submit monthly progress report", due: "31 Dec", priority: "low" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px" }}>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => <p key={i} style={{ fontSize: 13, fontWeight: 600, color: p.color }}>{p.value} {p.name}</p>)}
    </div>
  );
};

export default function TeacherDashboard() {
  const { state } = useApp();
  const teacher = state.teachers.find(t => t.email === state.user?.email) || state.teachers[0];

  return (
    <div className="animate-fade-in">
      {/* Welcome Banner */}
      <div style={{
        background: "linear-gradient(135deg, #10b98118, #059669 0%, #10b98120)",
        border: "1px solid #10b98130",
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
          <div className="avatar avatar-lg" style={{ background: "linear-gradient(135deg, #10b981, #059669)", fontSize: 18 }}>
            {state.user?.name?.charAt(0)}
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800 }}>
              Good day, {state.user?.name?.split(" ").slice(-1)[0]}! 🎓
            </h2>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>
              Subject: <strong style={{ color: "#10b981" }}>{teacher?.subject || "Mathematics"}</strong> · {teacher?.experience || "8 years"} experience
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ textAlign: "center", background: "var(--bg-card)", borderRadius: 10, padding: "10px 18px", border: "1px solid var(--border)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#10b981" }}>{teacher?.students || 24}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>My Students</div>
          </div>
          <div style={{ textAlign: "center", background: "var(--bg-card)", borderRadius: 10, padding: "10px 18px", border: "1px solid var(--border)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--warning)" }}>3</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Today's Classes</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <StatCard title="My Students" value={teacher?.students || 24} subtitle="Across all batches" icon={Users} color="#10b981" trend={3} />
        <StatCard title="Classes Today" value="3" subtitle="34 total students" icon={BookOpen} color="#6366f1" />
        <StatCard title="Avg Class Score" value="82%" subtitle="Last test" icon={TrendingUp} color="#f59e0b" trend={6} />
        <StatCard title="Pending Tasks" value={pendingTasks.length} subtitle="Due this week" icon={ClipboardList} color="#ef4444" />
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Student performance */}
        <div className="card">
          <div style={{ marginBottom: 18 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Student Scores</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Latest unit test — Batch A</p>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={classPerformance} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]} name="score"
                fill="url(#barGrad)"
              />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly attendance */}
        <div className="card">
          <div style={{ marginBottom: 18 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>This Week's Attendance</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Present vs Absent per day</p>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={weeklyAttendance} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="present" fill="#10b981" radius={[3, 3, 0, 0]} name="present" />
              <Bar dataKey="absent" fill="#ef444455" radius={[3, 3, 0, 0]} name="absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Today's schedule */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Today's Schedule</h3>
            <Calendar size={16} color="#10b981" />
          </div>
          {todaySchedule.map((cls, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < todaySchedule.length - 1 ? "1px solid var(--border-light)" : "none" }}>
              <div style={{ minWidth: 64, textAlign: "center", background: "#10b98114", borderRadius: 8, padding: "8px 6px", height: "fit-content" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#10b981" }}>{cls.time.split(" ")[0]}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{cls.time.split(" ")[1]}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{cls.course}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{cls.batch} · {cls.room} · {cls.students} students</div>
              </div>
            </div>
          ))}
        </div>

        {/* Test distribution + tasks */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card">
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Score Distribution</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie data={testResultsDist} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value">
                    {testResultsDist.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div>
                {testResultsDist.map(item => (
                  <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{item.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, marginLeft: "auto", paddingLeft: 8 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Pending Tasks</h3>
              <Bell size={16} color="var(--warning)" />
            </div>
            {pendingTasks.map((task, i) => {
              const pColors = { high: "var(--danger)", medium: "var(--warning)", low: "var(--success)" };
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < pendingTasks.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: pColors[task.priority], flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{task.task}</div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Due: {task.due}</div>
                  </div>
                  <span style={{ fontSize: 10, color: pColors[task.priority], background: `${pColors[task.priority]}18`, padding: "2px 8px", borderRadius: 20, fontWeight: 600, textTransform: "capitalize" }}>{task.priority}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Student list */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>My Students</h3>
          <CheckCircle size={16} color="#10b981" />
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr><th>Student</th><th>Grade</th><th>Last Score</th><th>Attendance</th><th>Status</th></tr></thead>
            <tbody>
              {state.students.filter(s => s.status === "active").slice(0, 6).map((s, i) => {
                const score = classPerformance[i]?.score || 75;
                const att = 80 + Math.floor(Math.random() * 18);
                return (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="avatar" style={{ width: 28, height: 28, fontSize: 10, background: "linear-gradient(135deg, #10b981, #059669)" }}>{s.avatar}</div>
                        <span style={{ fontSize: 13 }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-secondary)", fontSize: 13 }}>{s.grade}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: score >= 80 ? "var(--success)" : score >= 65 ? "var(--warning)" : "var(--danger)", fontSize: 13 }}>{score}%</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, height: 4, background: "var(--border)", borderRadius: 2, maxWidth: 60 }}>
                          <div style={{ width: `${att}%`, height: "100%", background: att >= 85 ? "var(--success)" : "var(--warning)", borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{att}%</span>
                      </div>
                    </td>
                    <td><span className="badge badge-success">Active</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}