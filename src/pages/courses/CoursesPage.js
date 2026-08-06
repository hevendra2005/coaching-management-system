// // src/pages/courses/CoursesPage.js
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Plus, Pencil, Trash2, BookOpen, Users, Clock } from "lucide-react";
// import { useApp } from "../../context/AppContext";
// import Modal from "../../components/common/Modal";
// import DataTable from "../../components/common/DataTable";
// import toast from "react-hot-toast";

// const schema = yup.object({
//   name: yup.string().min(3).required("Course name is required"),
//   code: yup.string().min(3).required("Course code is required"),
//   teacher: yup.string().required("Teacher is required"),
//   duration: yup.string().required("Duration is required"),
//   fee: yup.number().positive().required("Fee is required"),
//   schedule: yup.string().required("Schedule is required"),
// });

// function CourseForm({ onSubmit, defaultValues, isSubmitting, teachers }) {
//   const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema), defaultValues });
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//       <div className="grid-2">
//         <div className="input-group">
//           <label className="input-label">Course Name *</label>
//           <input className={`input ${errors.name ? "input-error" : ""}`} placeholder="e.g. Advanced Mathematics" {...register("name")} />
//           {errors.name && <span className="error-text">{errors.name.message}</span>}
//         </div>
//         <div className="input-group">
//           <label className="input-label">Course Code *</label>
//           <input className={`input ${errors.code ? "input-error" : ""}`} placeholder="e.g. MATH101" {...register("code")} />
//           {errors.code && <span className="error-text">{errors.code.message}</span>}
//         </div>
//         <div className="input-group">
//           <label className="input-label">Assign Teacher *</label>
//           <select className={`select ${errors.teacher ? "input-error" : ""}`} {...register("teacher")}>
//             <option value="">Select teacher</option>
//             {teachers.map(t => <option key={t.id} value={t.name}>{t.name} ({t.subject})</option>)}
//           </select>
//           {errors.teacher && <span className="error-text">{errors.teacher.message}</span>}
//         </div>
//         <div className="input-group">
//           <label className="input-label">Duration *</label>
//           <input className={`input ${errors.duration ? "input-error" : ""}`} placeholder="e.g. 6 months" {...register("duration")} />
//           {errors.duration && <span className="error-text">{errors.duration.message}</span>}
//         </div>
//         <div className="input-group">
//           <label className="input-label">Fee (₹) *</label>
//           <input className={`input ${errors.fee ? "input-error" : ""}`} type="number" placeholder="e.g. 8000" {...register("fee")} />
//           {errors.fee && <span className="error-text">{errors.fee.message}</span>}
//         </div>
//         <div className="input-group">
//           <label className="input-label">Schedule *</label>
//           <input className={`input ${errors.schedule ? "input-error" : ""}`} placeholder="e.g. Mon, Wed, Fri" {...register("schedule")} />
//           {errors.schedule && <span className="error-text">{errors.schedule.message}</span>}
//         </div>
//         <div className="input-group">
//           <label className="input-label">Status</label>
//           <select className="select" {...register("status")}>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>
//       </div>
//       <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
//         <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
//           {isSubmitting ? <span className="spinner" /> : defaultValues?.id ? "Update Course" : "Create Course"}
//         </button>
//       </div>
//     </form>
//   );
// }

// export default function CoursesPage() {
//   const { state, dispatch } = useApp();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editCourse, setEditCourse] = useState(null);
//   const [viewMode, setViewMode] = useState("table"); // "table" | "grid"
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (data) => {
//     setSubmitting(true);
//     await new Promise(r => setTimeout(r, 500));
//     if (editCourse) {
//       dispatch({ type: "UPDATE_COURSE", payload: { ...editCourse, ...data, fee: Number(data.fee) } });
//       toast.success("Course updated!");
//     } else {
//       dispatch({ type: "ADD_COURSE", payload: { ...data, fee: Number(data.fee), students: 0, status: data.status || "active" } });
//       toast.success("Course created!");
//     }
//     setSubmitting(false);
//     setModalOpen(false);
//     setEditCourse(null);
//   };

//   const handleDelete = (id, name) => {
//     if (window.confirm(`Delete "${name}"?`)) {
//       dispatch({ type: "DELETE_COURSE", payload: id });
//       toast.success("Course deleted");
//     }
//   };

//   const columns = [
//     { key: "name", label: "Course", render: (val, row) => (
//       <div>
//         <div style={{ fontWeight: 500, fontSize: 13 }}>{val}</div>
//         <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{row.code}</div>
//       </div>
//     )},
//     { key: "teacher", label: "Teacher", render: v => <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{v}</span> },
//     { key: "students", label: "Students", render: v => <span style={{ fontWeight: 600, color: "var(--accent-light)" }}>{v}</span> },
//     { key: "duration", label: "Duration", render: v => <span style={{ fontSize: 13, color: "var(--text-secondary)" }}><Clock size={12} style={{ marginRight: 4, display: "inline" }} />{v}</span> },
//     { key: "fee", label: "Fee", render: v => <span style={{ fontWeight: 600 }}>₹{Number(v).toLocaleString()}</span> },
//     { key: "schedule", label: "Schedule", render: v => <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{v}</span> },
//     { key: "status", label: "Status", render: v => <span className={`badge ${v === "active" ? "badge-success" : "badge-danger"}`}>{v}</span> },
//   ];

//   return (
//     <div className="animate-fade-in">
//       <div className="page-header">
//         <div>
//           <h1 className="page-title">Courses</h1>
//           <p className="page-subtitle">{state.courses.length} courses · {state.courses.filter(c => c.status === "active").length} active</p>
//         </div>
//         <div style={{ display: "flex", gap: 8 }}>
//           <div style={{ display: "flex", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
//             {["table", "grid"].map(m => (
//               <button key={m} onClick={() => setViewMode(m)} style={{ padding: "8px 14px", background: viewMode === m ? "var(--accent)" : "transparent", border: "none", color: viewMode === m ? "white" : "var(--text-secondary)", cursor: "pointer", fontSize: 12, transition: "var(--transition)" }}>
//                 {m === "table" ? "Table" : "Cards"}
//               </button>
//             ))}
//           </div>
//           <button className="btn btn-primary" onClick={() => { setEditCourse(null); setModalOpen(true); }}>
//             <Plus size={16} /> Add Course
//           </button>
//         </div>
//       </div>

//       {viewMode === "table" ? (
//         <div className="card">
//           <DataTable
//             columns={columns}
//             data={state.courses}
//             searchKeys={["name", "code", "teacher"]}
//             emptyMessage="No courses yet."
//             actions={(row) => (
//               <>
//                 <button className="btn btn-secondary btn-sm btn-icon" onClick={() => { setEditCourse(row); setModalOpen(true); }}><Pencil size={13} /></button>
//                 <button className="btn btn-danger btn-sm btn-icon" onClick={() => handleDelete(row.id, row.name)}><Trash2 size={13} /></button>
//               </>
//             )}
//           />
//         </div>
//       ) : (
//         <div className="grid-3">
//           {state.courses.map(course => (
//             <div key={course.id} className="card" style={{ position: "relative" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//                 <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent)22", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <BookOpen size={18} color="var(--accent-light)" />
//                 </div>
//                 <span className={`badge ${course.status === "active" ? "badge-success" : "badge-danger"}`}>{course.status}</span>
//               </div>
//               <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{course.name}</h3>
//               <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 16 }}>{course.code}</p>
//               <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-secondary)" }}>
//                   <Users size={13} />{course.students} students
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-secondary)" }}>
//                   <Clock size={13} />{course.duration}
//                 </div>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
//                 <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent-light)" }}>₹{Number(course.fee).toLocaleString()}</span>
//                 <div style={{ display: "flex", gap: 6 }}>
//                   <button className="btn btn-secondary btn-sm btn-icon" onClick={() => { setEditCourse(course); setModalOpen(true); }}><Pencil size={12} /></button>
//                   <button className="btn btn-danger btn-sm btn-icon" onClick={() => handleDelete(course.id, course.name)}><Trash2 size={12} /></button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditCourse(null); }} title={editCourse ? "Edit Course" : "Create Course"}>
//         <CourseForm onSubmit={handleSubmit} defaultValues={editCourse || { status: "active" }} isSubmitting={submitting} teachers={state.teachers} />
//       </Modal>
//     </div>
//   );
// }


// src/pages/courses/CoursesPage.js
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Plus, Pencil, Trash2, BookOpen, Users, Clock, RefreshCw } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Modal from "../../components/common/Modal";
import DataTable from "../../components/common/DataTable";
import toast from "react-hot-toast";

const schema = yup.object({
  name: yup.string().min(3, "Min 3 characters").required("Course name is required"),
  code: yup.string().min(2, "Min 2 characters").required("Course code is required"),
  subject: yup.string().required("Subject is required"),
  duration: yup.string().required("Duration is required"),
  fee: yup.number().typeError("Fee must be a number").positive("Fee must be positive").required("Fee is required"),
  schedule: yup.string().required("Schedule is required"),
  maxStudents: yup.number().typeError("Must be a number").positive().integer().nullable(),
  grade: yup.string(),
  description: yup.string(),
  teacher: yup.string(),
  status: yup.string(),
});

function CourseForm({ onSubmit, defaultValues, isSubmitting, teachers }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="grid-2">
        <div className="input-group">
          <label className="input-label">Course Name *</label>
          <input className={`input ${errors.name ? "input-error" : ""}`} placeholder="e.g. Advanced Mathematics" {...register("name")} />
          {errors.name && <span className="error-text">{errors.name.message}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Course Code *</label>
          <input className={`input ${errors.code ? "input-error" : ""}`} placeholder="e.g. MATH101" {...register("code")} />
          {errors.code && <span className="error-text">{errors.code.message}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Subject *</label>
          <input className={`input ${errors.subject ? "input-error" : ""}`} placeholder="e.g. Mathematics" {...register("subject")} />
          {errors.subject && <span className="error-text">{errors.subject.message}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Assign Teacher</label>
          <select className="select" {...register("teacher")}>
            <option value="">No teacher assigned</option>
            {teachers.map(t => (
              <option key={t.id} value={t.name}>
                {t.name}{t.subject ? ` (${t.subject})` : ""}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label className="input-label">Duration *</label>
          <input className={`input ${errors.duration ? "input-error" : ""}`} placeholder="e.g. 6 months" {...register("duration")} />
          {errors.duration && <span className="error-text">{errors.duration.message}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Schedule *</label>
          <input className={`input ${errors.schedule ? "input-error" : ""}`} placeholder="e.g. Mon, Wed, Fri" {...register("schedule")} />
          {errors.schedule && <span className="error-text">{errors.schedule.message}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Fee (₹) *</label>
          <input className={`input ${errors.fee ? "input-error" : ""}`} type="number" placeholder="e.g. 8000" {...register("fee")} />
          {errors.fee && <span className="error-text">{errors.fee.message}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Max Students</label>
          <input className="input" type="number" placeholder="e.g. 25" {...register("maxStudents")} />
        </div>
        <div className="input-group">
          <label className="input-label">Grade (optional)</label>
          <input className="input" placeholder="e.g. 11th" {...register("grade")} />
        </div>
        <div className="input-group">
          <label className="input-label">Status</label>
          <select className="select" {...register("status")}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">Description</label>
        <textarea className="input" rows={2} placeholder="Brief course description..." style={{ resize: "vertical" }} {...register("description")} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? <span className="spinner" /> : defaultValues?.id ? "Update Course" : "Create Course"}
        </button>
      </div>
    </form>
  );
}

export default function CoursesPage() {
  const { state, fetchCourses, fetchTeachers, createCourse, updateCourse, deleteCourse } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [viewMode, setViewMode] = useState("table");

  // Load both courses and teachers on mount (need teachers for the assign dropdown)
  useEffect(() => {
    fetchCourses();
    if (state.teachers.length === 0) fetchTeachers();
  }, [fetchCourses, fetchTeachers]);

  const handleSubmit = async (data) => {
    let result;
    if (editCourse) {
      result = await updateCourse(editCourse.id, data, state.teachers);
      if (result.success) toast.success("Course updated successfully!");
      else toast.error(result.message);
    } else {
      result = await createCourse(data, state.teachers);
      if (result.success) toast.success("Course created successfully!");
      else toast.error(result.message);
    }
    if (result.success) { setModalOpen(false); setEditCourse(null); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This will also remove all enrollments and attendance for this course.`)) return;
    const result = await deleteCourse(id);
    if (result.success) toast.success("Course deleted.");
    else toast.error(result.message);
  };

  const isLoading = state.loading.courses;
  const isSubmitting = state.loading.submit;
  const activeCourses = state.courses.filter(c => c.status === "active").length;

  const columns = [
    {
      key: "name", label: "Course",
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 500, fontSize: 13 }}>{val}</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "monospace" }}>{row.code}</div>
        </div>
      ),
    },
    { key: "subject", label: "Subject", render: v => <span className="badge badge-purple">{v || "—"}</span> },
    { key: "teacher", label: "Teacher", render: v => <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{v || "Not assigned"}</span> },
    { key: "students", label: "Enrolled", render: v => <span style={{ fontWeight: 600, color: "var(--accent-light)" }}>{v}</span> },
    { key: "duration", label: "Duration", render: v => <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{v}</span> },
    { key: "fee", label: "Fee", render: v => <span style={{ fontWeight: 600 }}>₹{Number(v).toLocaleString()}</span> },
    { key: "schedule", label: "Schedule", render: v => <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{v}</span> },
    { key: "status", label: "Status", render: v => <span className={`badge ${v === "active" ? "badge-success" : v === "upcoming" ? "badge-warning" : "badge-danger"}`}>{v}</span> },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Courses</h1>
          <p className="page-subtitle">
            {isLoading ? "Loading…" : `${state.courses.length} courses · ${activeCourses} active`}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ display: "flex", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
            {["table", "grid"].map(m => (
              <button key={m} onClick={() => setViewMode(m)} style={{
                padding: "8px 14px", background: viewMode === m ? "var(--accent)" : "transparent",
                border: "none", color: viewMode === m ? "white" : "var(--text-secondary)",
                cursor: "pointer", fontSize: 12, transition: "var(--transition)",
              }}>
                {m === "table" ? "Table" : "Cards"}
              </button>
            ))}
          </div>
          <button className="btn btn-secondary" onClick={() => fetchCourses()} title="Refresh">
            <RefreshCw size={15} />
          </button>
          <button className="btn btn-primary" onClick={() => { setEditCourse(null); setModalOpen(true); }}>
            <Plus size={16} /> Add Course
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { label: "Total Courses", val: state.courses.length, color: "var(--accent)" },
          { label: "Active", val: activeCourses, color: "var(--success)" },
          { label: "Total Seats Filled", val: state.courses.reduce((s, c) => s + (c.students || 0), 0), color: "var(--info)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "14px 20px", flex: "0 0 auto" }}>
            <div style={{ fontSize: 22, fontFamily: "var(--font-display)", fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {isLoading && state.courses.length === 0 ? (
        <div className="card loading-overlay"><span className="spinner" style={{ width: 28, height: 28, borderWidth: 3 }} /></div>
      ) : viewMode === "table" ? (
        <div className="card">
          <DataTable
            columns={columns}
            data={state.courses}
            searchKeys={["name", "code", "teacher", "subject"]}
            emptyMessage="No courses yet. Create your first course!"
            actions={(row) => (
              <>
                <button className="btn btn-secondary btn-sm btn-icon" onClick={() => { setEditCourse(row); setModalOpen(true); }} title="Edit">
                  <Pencil size={13} />
                </button>
                <button className="btn btn-danger btn-sm btn-icon" onClick={() => handleDelete(row.id, row.name)} title="Delete">
                  <Trash2 size={13} />
                </button>
              </>
            )}
          />
        </div>
      ) : (
        <div className="grid-3">
          {state.courses.map(course => (
            <div key={course.id} className="card" style={{ position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent)22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BookOpen size={18} color="var(--accent-light)" />
                </div>
                <span className={`badge ${course.status === "active" ? "badge-success" : course.status === "upcoming" ? "badge-warning" : "badge-danger"}`}>{course.status}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{course.name}</h3>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, fontFamily: "monospace" }}>{course.code}</p>
              <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 14 }}>{course.teacher || "No teacher assigned"}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-secondary)" }}>
                  <Users size={13} />{course.students}/{course.maxStudents} students
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-secondary)" }}>
                  <Clock size={13} />{course.duration}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent-light)" }}>₹{Number(course.fee).toLocaleString()}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn btn-secondary btn-sm btn-icon" onClick={() => { setEditCourse(course); setModalOpen(true); }}><Pencil size={12} /></button>
                  <button className="btn btn-danger btn-sm btn-icon" onClick={() => handleDelete(course.id, course.name)}><Trash2 size={12} /></button>
                </div>
              </div>
            </div>
          ))}
          {state.courses.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40, color: "var(--text-muted)" }}>
              No courses yet. Create your first course!
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditCourse(null); }}
        title={editCourse ? "Edit Course" : "Create New Course"}
        size="lg"
      >
        <CourseForm
          onSubmit={handleSubmit}
          defaultValues={editCourse
            ? { name: editCourse.name, code: editCourse.code, subject: editCourse.subject, teacher: editCourse.teacher, duration: editCourse.duration, schedule: editCourse.schedule, fee: editCourse.fee, maxStudents: editCourse.maxStudents, grade: editCourse.grade, description: editCourse.description, status: editCourse.status }
            : { status: "active", maxStudents: 25 }
          }
          isSubmitting={isSubmitting}
          teachers={state.teachers}
        />
      </Modal>
    </div>
  );
}