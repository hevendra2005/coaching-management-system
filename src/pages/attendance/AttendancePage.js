// // src/pages/attendance/AttendancePage.js
// import React, { useState, useMemo } from "react";
// import { CheckCircle, XCircle, Clock, Save, Filter } from "lucide-react";
// import { useApp } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const STATUS_CONFIG = {
//   present: { label: "Present", color: "var(--success)", icon: CheckCircle, badge: "badge-success" },
//   absent: { label: "Absent", color: "var(--danger)", icon: XCircle, badge: "badge-danger" },
//   late: { label: "Late", color: "var(--warning)", icon: Clock, badge: "badge-warning" },
// };

// export default function AttendancePage() {
//   const { state, dispatch } = useApp();
//   const today = new Date().toISOString().split("T")[0];
//   const [selectedDate, setSelectedDate] = useState(today);
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [localAttendance, setLocalAttendance] = useState({});
//   const [saved, setSaved] = useState(false);

//   const courseStudents = useMemo(() => {
//     if (!selectedCourse) return state.students;
//     return state.students.filter(s => s.course === selectedCourse || s.status === "active");
//   }, [selectedCourse, state.students]);

//   const getAttendanceStatus = (studentName) => {
//     if (localAttendance[studentName]) return localAttendance[studentName];
//     const record = state.attendance.find(a => a.student === studentName && a.date === selectedDate);
//     return record?.status || null;
//   };

//   const markStatus = (studentName, status) => {
//     setSaved(false);
//     setLocalAttendance(prev => ({ ...prev, [studentName]: status }));
//   };

//   const saveAttendance = () => {
//     let saved = 0;
//     Object.entries(localAttendance).forEach(([student, status]) => {
//       dispatch({ type: "MARK_ATTENDANCE", payload: {
//         student, status, date: selectedDate,
//         course: selectedCourse || "General",
//         id: Date.now() + Math.random(),
//       }});
//       saved++;
//     });
//     if (saved > 0) {
//       toast.success(`Attendance saved for ${saved} students!`);
//       setSaved(true);
//       setLocalAttendance({});
//     } else {
//       toast.error("Mark attendance for at least one student");
//     }
//   };

//   const markAll = (status) => {
//     const newLocal = {};
//     courseStudents.forEach(s => { newLocal[s.name] = status; });
//     setLocalAttendance(newLocal);
//     setSaved(false);
//   };

//   // Stats for selected date
//   const dateRecords = state.attendance.filter(a => a.date === selectedDate);
//   const presentCount = dateRecords.filter(a => a.status === "present").length;
//   const absentCount = dateRecords.filter(a => a.status === "absent").length;
//   const lateCount = dateRecords.filter(a => a.status === "late").length;

//   // Recent records
//   const recentRecords = [...state.attendance].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

//   return (
//     <div className="animate-fade-in">
//       <div className="page-header">
//         <div>
//           <h1 className="page-title">Attendance</h1>
//           <p className="page-subtitle">Mark and track student attendance</p>
//         </div>
//       </div>

//       {/* Stats */}
//       <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
//         {[
//           { label: "Present", val: presentCount, color: "var(--success)" },
//           { label: "Absent", val: absentCount, color: "var(--danger)" },
//           { label: "Late", val: lateCount, color: "var(--warning)" },
//           { label: "Total Records", val: state.attendance.length, color: "var(--accent)" },
//         ].map(s => (
//           <div key={s.label} className="card" style={{ padding: "14px 24px", flex: "0 0 auto" }}>
//             <div style={{ fontSize: 24, fontFamily: "var(--font-display)", fontWeight: 800, color: s.color }}>{s.val}</div>
//             <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{s.label} Today</div>
//           </div>
//         ))}
//       </div>

//       <div className="grid-2" style={{ gap: 24 }}>
//         {/* Mark Attendance */}
//         <div className="card">
//           <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Mark Attendance</h3>

//           <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
//             <div className="input-group" style={{ flex: 1 }}>
//               <label className="input-label">Date</label>
//               <input type="date" className="input" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
//             </div>
//             <div className="input-group" style={{ flex: 1 }}>
//               <label className="input-label">Course (optional)</label>
//               <select className="select" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
//                 <option value="">All Students</option>
//                 {state.courses.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
//               </select>
//             </div>
//           </div>

//           {/* Quick actions */}
//           <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
//             <button className="btn btn-sm" style={{ background: "var(--success)22", color: "var(--success)", border: "1px solid var(--success)33" }} onClick={() => markAll("present")}>
//               <CheckCircle size={12} /> All Present
//             </button>
//             <button className="btn btn-sm" style={{ background: "var(--danger)22", color: "var(--danger)", border: "1px solid var(--danger)33" }} onClick={() => markAll("absent")}>
//               <XCircle size={12} /> All Absent
//             </button>
//           </div>

//           <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 400, overflowY: "auto" }}>
//             {courseStudents.map(student => {
//               const status = getAttendanceStatus(student.name);
//               return (
//                 <div key={student.id} style={{
//                   display: "flex", alignItems: "center", justifyContent: "space-between",
//                   padding: "10px 14px", borderRadius: "var(--radius-sm)",
//                   background: "var(--bg-hover)", border: "1px solid var(--border)",
//                   transition: "var(--transition)",
//                 }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                     <div className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>{student.avatar}</div>
//                     <div>
//                       <div style={{ fontSize: 13, fontWeight: 500 }}>{student.name}</div>
//                       <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{student.course}</div>
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", gap: 6 }}>
//                     {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
//                       <button
//                         key={key}
//                         onClick={() => markStatus(student.name, key)}
//                         style={{
//                           padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
//                           border: `1px solid ${status === key ? cfg.color : "var(--border)"}`,
//                           background: status === key ? `${cfg.color}22` : "transparent",
//                           color: status === key ? cfg.color : "var(--text-muted)",
//                           cursor: "pointer", transition: "var(--transition)",
//                         }}
//                       >
//                         {cfg.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
//             <button className="btn btn-primary w-full" style={{ justifyContent: "center" }} onClick={saveAttendance}>
//               <Save size={15} /> Save Attendance
//             </button>
//           </div>
//         </div>

//         {/* Recent Records */}
//         <div className="card">
//           <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Recent Records</h3>
//           <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//             {recentRecords.map((record, i) => {
//               const cfg = STATUS_CONFIG[record.status];
//               const Icon = cfg?.icon || CheckCircle;
//               return (
//                 <div key={i} style={{
//                   display: "flex", alignItems: "center", justifyContent: "space-between",
//                   padding: "10px 14px", borderRadius: "var(--radius-sm)",
//                   background: "var(--bg-hover)", border: "1px solid var(--border)",
//                 }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                     <Icon size={16} color={cfg?.color} style={{ flexShrink: 0 }} />
//                     <div>
//                       <div style={{ fontSize: 13, fontWeight: 500 }}>{record.student}</div>
//                       <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{record.course} · {record.date}</div>
//                     </div>
//                   </div>
//                   <span className={`badge ${cfg?.badge || "badge-info"}`}>{record.status}</span>
//                 </div>
//               );
//             })}
//             {recentRecords.length === 0 && (
//               <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)", fontSize: 13 }}>
//                 No attendance records yet
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/attendance/AttendancePage.js
import React, { useState, useEffect, useCallback } from "react";
import {
  CheckCircle, XCircle, Clock, Save, RefreshCw,
  AlertCircle, BookOpen, Users, CalendarDays
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import api from "../../services/api";
import toast from "react-hot-toast";

// ── Status config (uppercase keys to match backend enum)
const STATUS_CONFIG = {
  PRESENT: { label: "Present", color: "var(--success)", icon: CheckCircle, badge: "badge-success" },
  ABSENT:  { label: "Absent",  color: "var(--danger)",  icon: XCircle,     badge: "badge-danger"  },
  LATE:    { label: "Late",    color: "var(--warning)", icon: Clock,       badge: "badge-warning" },
};

// Normalise backend status to uppercase (backend stores PRESENT/ABSENT/LATE)
const toUpper = (s) => (s || "").toUpperCase();

export default function AttendancePage() {
  const { state, fetchCourses, fetchStudents, markAttendance } = useApp();

  const today = new Date().toISOString().split("T")[0];

  // ── UI state
  const [selectedDate,   setSelectedDate]   = useState(today);
  const [selectedCourse, setSelectedCourse] = useState("");

  // localMarks: { [studentId]: "PRESENT" | "ABSENT" | "LATE" }
  const [localMarks,  setLocalMarks]  = useState({});
  const [saving,      setSaving]      = useState(false);

  // ── Records fetched from backend for the selected date/course
  const [fetchedRecords, setFetchedRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(false);

  // ── Stats computed from fetched records for this date
  const [dateStats, setDateStats] = useState({ PRESENT: 0, ABSENT: 0, LATE: 0, total: 0 });

  // ── Recent records panel (last 15 across all courses)
  const [recentRecords,      setRecentRecords]      = useState([]);
  const [loadingRecent,      setLoadingRecent]       = useState(false);

  // ── Load courses & students if not already loaded
  useEffect(() => {
    if (state.courses.length === 0)  fetchCourses();
    if (state.students.length === 0) fetchStudents();
  }, [fetchCourses, fetchStudents]);

  // ── Fetch today's records for stats on first load
  useEffect(() => {
    fetchRecordsForDate(today, "");
    fetchRecentRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Re-fetch when date or course changes
  useEffect(() => {
    fetchRecordsForDate(selectedDate, selectedCourse);
    setLocalMarks({}); // clear pending marks when filter changes
  }, [selectedDate, selectedCourse]);

  // ─────────────────────────────────────────────
  // Fetch attendance records from backend
  // ─────────────────────────────────────────────
  const fetchRecordsForDate = useCallback(async (date, courseId) => {
    setLoadingRecords(true);
    try {
      const params = courseId ? { courseId } : {};
      const res = await api.get(`/attendance/date/${date}`, { params });
      const data = res.data.data;
      const records = data?.records || data || [];
      const summary = data?.summary || {};

      setFetchedRecords(records);

      // Compute stats from summary or records
      const present = summary.PRESENT ?? records.filter(r => toUpper(r.status) === "PRESENT").length;
      const absent  = summary.ABSENT  ?? records.filter(r => toUpper(r.status) === "ABSENT").length;
      const late    = summary.LATE    ?? records.filter(r => toUpper(r.status) === "LATE").length;
      setDateStats({ PRESENT: present, ABSENT: absent, LATE: late, total: records.length });

      // Pre-fill localMarks with already-saved statuses so user sees existing data
      const prefill = {};
      records.forEach(r => {
        const sid = r.studentId || r.student?.id;
        if (sid) prefill[sid] = toUpper(r.status);
      });
      setLocalMarks(prefill);
    } catch (_) {
      setFetchedRecords([]);
      setDateStats({ PRESENT: 0, ABSENT: 0, LATE: 0, total: 0 });
    } finally {
      setLoadingRecords(false);
    }
  }, []);

  // ─────────────────────────────────────────────
  // Fetch recent records for the right panel
  // ─────────────────────────────────────────────
  const fetchRecentRecords = useCallback(async () => {
    setLoadingRecent(true);
    try {
      // Get today's date records as a starting point
      const res = await api.get(`/attendance/date/${today}`, { params: { limit: 15 } });
      const data = res.data.data;
      const records = data?.records || data || [];
      setRecentRecords(records.slice(0, 15));
    } catch (_) {
      setRecentRecords([]);
    } finally {
      setLoadingRecent(false);
    }
  }, [today]);

  // ─────────────────────────────────────────────
  // Which students to show in the marking list
  // ─────────────────────────────────────────────
  const displayStudents = (() => {
    if (!selectedCourse) return state.students;
    // Show only students enrolled in this course
    const course = state.courses.find(c => c.id === selectedCourse || c.name === selectedCourse);
    if (!course) return state.students;
    return state.students.filter(s =>
      s.enrollments?.some(e => e.course?.id === course.id || e.courseId === course.id) ||
      s.course === course.name
    );
  })();

  // Get the current mark for a student (pending local OR already saved)
  const getMarkFor = (studentId) => localMarks[studentId] || null;

  // Mark a single student
  const markStudent = (studentId, status) => {
    setLocalMarks(prev => ({ ...prev, [studentId]: status }));
  };

  // Mark all displayed students with the same status
  const markAll = (status) => {
    const next = {};
    displayStudents.forEach(s => { next[s.id] = status; });
    setLocalMarks(prev => ({ ...prev, ...next }));
  };

  // ─────────────────────────────────────────────
  // Save attendance to backend
  // ─────────────────────────────────────────────
  const saveAttendance = async () => {
    if (!selectedCourse) {
      toast.error("Please select a course before saving attendance.");
      return;
    }

    const pendingEntries = Object.entries(localMarks).filter(([, status]) => !!status);
    if (pendingEntries.length === 0) {
      toast.error("Mark attendance for at least one student first.");
      return;
    }

    setSaving(true);
    try {
      // Find the course UUID from the selected course id/name
      const course = state.courses.find(
        c => c.id === selectedCourse || c.name === selectedCourse
      );
      if (!course) {
        toast.error("Could not find course. Please refresh and try again.");
        return;
      }
      const courseId = course._rawId || course.id;

      // Build records array for backend
      const records = pendingEntries.map(([studentId, status]) => ({
        studentId,
        status: toUpper(status), // backend expects PRESENT / ABSENT / LATE
      }));

      const result = await markAttendance(courseId, selectedDate, records);

      if (result.success) {
        toast.success(`Attendance saved for ${records.length} student${records.length !== 1 ? "s" : ""}!`);
        // Re-fetch to sync with DB and update stats
        await fetchRecordsForDate(selectedDate, selectedCourse);
        await fetchRecentRecords();
      } else {
        toast.error(result.message || "Failed to save attendance.");
      }
    } finally {
      setSaving(false);
    }
  };

  // ─────────────────────────────────────────────
  // Render helpers
  // ─────────────────────────────────────────────
  const markedCount = Object.values(localMarks).filter(Boolean).length;
  const isLoadingAttendance = state.loading.attendance;

  return (
    <div className="animate-fade-in">
      {/* ── Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="page-subtitle">Mark and track student attendance in real time</p>
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => { fetchRecordsForDate(selectedDate, selectedCourse); fetchRecentRecords(); }}
          title="Refresh"
        >
          <RefreshCw size={15} className={loadingRecords ? "spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ── Summary stats */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { label: "Present Today",     val: dateStats.PRESENT, color: "var(--success)" },
          { label: "Absent Today",      val: dateStats.ABSENT,  color: "var(--danger)"  },
          { label: "Late Today",        val: dateStats.LATE,    color: "var(--warning)" },
          { label: "Total Records",     val: dateStats.total,   color: "var(--accent)"  },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "14px 24px", flex: "0 0 auto" }}>
            <div style={{ fontSize: 24, fontFamily: "var(--font-display)", fontWeight: 800, color: s.color }}>
              {loadingRecords ? "…" : s.val}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ gap: 24, alignItems: "start" }}>

        {/* ── LEFT: Mark Attendance */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>
              Mark Attendance
            </h3>
            {markedCount > 0 && (
              <span className="badge badge-info">{markedCount} marked</span>
            )}
          </div>

          {/* Date + Course selectors */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div className="input-group" style={{ flex: 1, minWidth: 140 }}>
              <label className="input-label">
                <CalendarDays size={12} style={{ display: "inline", marginRight: 4 }} />
                Date *
              </label>
              <input
                type="date"
                className="input"
                value={selectedDate}
                max={today}
                onChange={e => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="input-group" style={{ flex: 1, minWidth: 160 }}>
              <label className="input-label">
                <BookOpen size={12} style={{ display: "inline", marginRight: 4 }} />
                Course *
              </label>
              <select
                className="select"
                value={selectedCourse}
                onChange={e => setSelectedCourse(e.target.value)}
              >
                <option value="">— Select a course —</option>
                {state.courses.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.code ? `(${c.code})` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Course-not-selected hint */}
          {!selectedCourse && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
              background: "var(--warning)12", border: "1px solid var(--warning)30",
              borderRadius: "var(--radius-sm)", marginBottom: 16,
            }}>
              <AlertCircle size={15} color="var(--warning)" />
              <span style={{ fontSize: 13, color: "var(--warning)" }}>
                Select a course to mark and save attendance.
              </span>
            </div>
          )}

          {/* Quick actions */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <button
              className="btn btn-sm"
              style={{ background: "var(--success)18", color: "var(--success)", border: "1px solid var(--success)33" }}
              onClick={() => markAll("PRESENT")}
              disabled={displayStudents.length === 0}
            >
              <CheckCircle size={12} /> All Present
            </button>
            <button
              className="btn btn-sm"
              style={{ background: "var(--danger)18", color: "var(--danger)", border: "1px solid var(--danger)33" }}
              onClick={() => markAll("ABSENT")}
              disabled={displayStudents.length === 0}
            >
              <XCircle size={12} /> All Absent
            </button>
            <button
              className="btn btn-sm"
              style={{ background: "var(--warning)18", color: "var(--warning)", border: "1px solid var(--warning)33" }}
              onClick={() => markAll("LATE")}
              disabled={displayStudents.length === 0}
            >
              <Clock size={12} /> All Late
            </button>
          </div>

          {/* Student list */}
          {state.loading.students ? (
            <div className="loading-overlay" style={{ padding: 40 }}>
              <span className="spinner" style={{ width: 24, height: 24, borderWidth: 2 }} />
            </div>
          ) : displayStudents.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 16px", color: "var(--text-muted)" }}>
              <Users size={28} style={{ marginBottom: 10, opacity: 0.4 }} />
              <p style={{ fontSize: 13 }}>
                {selectedCourse
                  ? "No students enrolled in this course yet."
                  : "No students found. Add students first."}
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 420, overflowY: "auto", paddingRight: 2 }}>
              {displayStudents.map(student => {
                const currentStatus = getMarkFor(student.id);
                return (
                  <div
                    key={student.id}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 14px", borderRadius: "var(--radius-sm)",
                      background: currentStatus
                        ? `${STATUS_CONFIG[currentStatus]?.color}0a`
                        : "var(--bg-hover)",
                      border: `1px solid ${currentStatus
                        ? STATUS_CONFIG[currentStatus]?.color + "33"
                        : "var(--border)"}`,
                      transition: "var(--transition)",
                    }}
                  >
                    {/* Student info */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                      <div className="avatar" style={{ width: 30, height: 30, fontSize: 11, flexShrink: 0 }}>
                        {student.avatar}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {student.name}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                          {student.rollNumber || student.grade}
                        </div>
                      </div>
                    </div>

                    {/* Status buttons */}
                    <div style={{ display: "flex", gap: 5, flexShrink: 0, marginLeft: 8 }}>
                      {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                        const isActive = currentStatus === key;
                        return (
                          <button
                            key={key}
                            onClick={() => markStudent(student.id, key)}
                            style={{
                              padding: "4px 10px", borderRadius: 20,
                              fontSize: 11, fontWeight: 600,
                              border: `1px solid ${isActive ? cfg.color : "var(--border)"}`,
                              background: isActive ? `${cfg.color}22` : "transparent",
                              color: isActive ? cfg.color : "var(--text-muted)",
                              cursor: "pointer", transition: "var(--transition)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {cfg.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Save button */}
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
            <button
              className="btn btn-primary w-full"
              style={{ justifyContent: "center" }}
              onClick={saveAttendance}
              disabled={saving || isLoadingAttendance || !selectedCourse || markedCount === 0}
            >
              {saving || isLoadingAttendance
                ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Saving…</>
                : <><Save size={15} /> Save Attendance ({markedCount} student{markedCount !== 1 ? "s" : ""})</>
              }
            </button>
            {!selectedCourse && markedCount > 0 && (
              <p style={{ textAlign: "center", fontSize: 12, color: "var(--danger)", marginTop: 8 }}>
                Select a course before saving.
              </p>
            )}
          </div>
        </div>

        {/* ── RIGHT: Records for Selected Date */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>
                Records — {selectedDate === today ? "Today" : selectedDate}
              </h3>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                {selectedCourse
                  ? `Course: ${state.courses.find(c => c.id === selectedCourse)?.name || selectedCourse}`
                  : "All courses"}
              </p>
            </div>
            {loadingRecords && (
              <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
            )}
          </div>

          {loadingRecords ? (
            <div className="loading-overlay" style={{ padding: 40 }}>
              <span className="spinner" style={{ width: 24, height: 24, borderWidth: 2 }} />
            </div>
          ) : fetchedRecords.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 16px", color: "var(--text-muted)" }}>
              <CalendarDays size={28} style={{ marginBottom: 10, opacity: 0.4 }} />
              <p style={{ fontSize: 13 }}>No attendance records for this date.</p>
              <p style={{ fontSize: 12, marginTop: 6 }}>Mark attendance on the left and save.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 560, overflowY: "auto" }}>
              {fetchedRecords.map((record, i) => {
                const status = toUpper(record.status);
                const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.PRESENT;
                const Icon = cfg.icon;
                const studentName = record.student?.user?.name || record.student?.name || record.student || "Unknown";
                const courseName = record.course?.name || record.course || "";
                const recordDate = (record.date || "").slice(0, 10);
                return (
                  <div
                    key={record.id || i}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 14px", borderRadius: "var(--radius-sm)",
                      background: "var(--bg-hover)", border: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                      <Icon size={16} color={cfg.color} style={{ flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {studentName}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                          {courseName}{courseName && recordDate ? " · " : ""}{recordDate}
                        </div>
                      </div>
                    </div>
                    <span className={`badge ${cfg.badge}`} style={{ flexShrink: 0, marginLeft: 8 }}>
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Attendance % bar for selected date */}
          {fetchedRecords.length > 0 && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Attendance rate</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--success)" }}>
                  {dateStats.total > 0
                    ? Math.round((dateStats.PRESENT / dateStats.total) * 100)
                    : 0}%
                </span>
              </div>
              <div style={{ height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 3,
                  background: "linear-gradient(90deg, var(--success), #059669)",
                  width: `${dateStats.total > 0 ? Math.round((dateStats.PRESENT / dateStats.total) * 100) : 0}%`,
                  transition: "width 0.4s ease",
                }} />
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.color }} />
                    <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                      {cfg.label}: <strong>{dateStats[key] || 0}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
