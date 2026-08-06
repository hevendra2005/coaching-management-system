// src/pages/dashboard/AdminDashboard.js
import React from "react";
import { GraduationCap, Users, BookOpen, DollarSign, Award } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/common/StatCard";
import { analyticsData } from "../../data/mockData";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px" }}>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ fontSize: 13, fontWeight: 600, color: p.color }}>
          {typeof p.value === "number" && p.name === "revenue" ? `₹${p.value.toLocaleString()}` : p.value} {p.name !== "revenue" ? p.name : ""}
        </p>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const { state } = useApp();
  const activeStudents = state.students.filter(s => s.status === "active").length;
  const activeTeachers = state.teachers.filter(t => t.status === "active").length;
  const activeCourses = state.courses.filter(c => c.status === "active").length;

  return (
    <div className="animate-fade-in">
      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        <StatCard title="Total Students" value={state.students.length} subtitle={`${activeStudents} active`} icon={GraduationCap} color="#6366f1" trend={12} />
        <StatCard title="Total Teachers" value={state.teachers.length} subtitle={`${activeTeachers} active`} icon={Users} color="#10b981" trend={5} />
        <StatCard title="Active Courses" value={activeCourses} subtitle={`${state.courses.length} total`} icon={BookOpen} color="#f59e0b" trend={8} />
        <StatCard title="Monthly Revenue" value="₹92K" subtitle="Dec 2024" icon={DollarSign} color="#3b82f6" trend={18} />
      </div>

      {/* Charts row 1 */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Enrollment Trend</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Monthly student enrollments</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={analyticsData.monthlyEnrollments}>
              <defs>
                <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={2.5} fill="url(#enrollGrad)" name="students" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Revenue Overview</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Monthly revenue in INR</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={analyticsData.revenueData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Attendance Overview</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Current month distribution</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={analyticsData.attendanceOverview} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {analyticsData.attendanceOverview.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`]} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {analyticsData.attendanceOverview.map(item => (
                <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color }} />
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item.name}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Course Popularity</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Students per course</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={analyticsData.coursePopularity} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="course" type="category" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="students" fill="#f59e0b" radius={[0, 4, 4, 0]} name="students" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Students */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Recent Students</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Latest enrollments</p>
          </div>
          <Award size={18} color="var(--accent-light)" />
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th><th>Course</th><th>Grade</th><th>Status</th><th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {state.students.slice(0, 5).map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="avatar" style={{ width: 30, height: 30, fontSize: 11 }}>{s.avatar}</div>
                      <span>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{s.course}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{s.grade}</td>
                  <td><span className={`badge ${s.status === "active" ? "badge-success" : "badge-danger"}`}>{s.status}</span></td>
                  <td style={{ color: "var(--text-muted)", fontSize: 12 }}>{s.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}