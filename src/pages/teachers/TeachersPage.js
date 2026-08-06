// // src/pages/teachers/TeachersPage.js
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Plus, Pencil, Trash2 } from "lucide-react";
// import { useApp } from "../../context/AppContext";
// import DataTable from "../../components/common/DataTable";
// import Modal from "../../components/common/Modal";
// import toast from "react-hot-toast";

// const schema = yup.object({
//   name: yup.string().min(2).required("Name is required"),
//   email: yup.string().email().required("Email is required"),
//   phone: yup.string().min(10).required("Phone is required"),
//   subject: yup.string().required("Subject is required"),
//   experience: yup.string().required("Experience is required"),
// });

// const SUBJECTS = ["Mathematics", "Science", "English", "Physics", "Chemistry", "Biology", "History", "Computer Science"];

// function TeacherForm({ onSubmit, defaultValues, isSubmitting }) {
//   const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema), defaultValues });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//       <div className="grid-2">
//         <div className="input-group">
//           <label className="input-label">Full Name *</label>
//           <input className={`input ${errors.name ? "input-error" : ""}`} placeholder="Teacher name" {...register("name")} />
//           {errors.name && <span className="error-text">{errors.name.message}</span>}
//         </div>
//         <div className="input-group">
//           <label className="input-label">Email *</label>
//           <input className={`input ${errors.email ? "input-error" : ""}`} placeholder="email@example.com" {...register("email")} />
//           {errors.email && <span className="error-text">{errors.email.message}</span>}
//         </div>
//         <div className="input-group">
//           <label className="input-label">Phone *</label>
//           <input className={`input ${errors.phone ? "input-error" : ""}`} placeholder="10-digit number" {...register("phone")} />
//           {errors.phone && <span className="error-text">{errors.phone.message}</span>}
//         </div>
//         <div className="input-group">
//           <label className="input-label">Subject *</label>
//           <select className={`select ${errors.subject ? "input-error" : ""}`} {...register("subject")}>
//             <option value="">Select subject</option>
//             {SUBJECTS.map(s => <option key={s}>{s}</option>)}
//           </select>
//           {errors.subject && <span className="error-text">{errors.subject.message}</span>}
//         </div>
//         <div className="input-group">
//           <label className="input-label">Experience *</label>
//           <input className={`input ${errors.experience ? "input-error" : ""}`} placeholder="e.g. 5 years" {...register("experience")} />
//           {errors.experience && <span className="error-text">{errors.experience.message}</span>}
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
//           {isSubmitting ? <span className="spinner" /> : defaultValues?.id ? "Update Teacher" : "Add Teacher"}
//         </button>
//       </div>
//     </form>
//   );
// }

// export default function TeachersPage() {
//   const { state, dispatch } = useApp();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editTeacher, setEditTeacher] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (data) => {
//     setSubmitting(true);
//     await new Promise(r => setTimeout(r, 500));
//     if (editTeacher) {
//       dispatch({ type: "UPDATE_TEACHER", payload: { ...editTeacher, ...data } });
//       toast.success("Teacher updated!");
//     } else {
//       dispatch({ type: "ADD_TEACHER", payload: { ...data, students: 0, status: data.status || "active", avatar: data.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) } });
//       toast.success("Teacher added!");
//     }
//     setSubmitting(false);
//     setModalOpen(false);
//     setEditTeacher(null);
//   };

//   const handleDelete = (id, name) => {
//     if (window.confirm(`Remove ${name}?`)) {
//       dispatch({ type: "DELETE_TEACHER", payload: id });
//       toast.success("Teacher removed");
//     }
//   };

//   const columns = [
//     { key: "name", label: "Teacher", render: (val, row) => (
//       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//         <div className="avatar" style={{ width: 34, height: 34, fontSize: 12, background: "linear-gradient(135deg, #10b981, #059669)" }}>{row.avatar}</div>
//         <div>
//           <div style={{ fontSize: 13, fontWeight: 500 }}>{val}</div>
//           <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{row.email}</div>
//         </div>
//       </div>
//     )},
//     { key: "subject", label: "Subject", render: v => <span className="badge badge-warning">{v}</span> },
//     { key: "phone", label: "Phone", render: v => <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{v}</span> },
//     { key: "experience", label: "Experience", render: v => <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{v}</span> },
//     { key: "students", label: "Students", render: v => <span style={{ fontWeight: 600, color: "var(--accent-light)" }}>{v || 0}</span> },
//     { key: "status", label: "Status", render: v => <span className={`badge ${v === "active" ? "badge-success" : "badge-danger"}`}>{v}</span> },
//   ];

//   return (
//     <div className="animate-fade-in">
//       <div className="page-header">
//         <div>
//           <h1 className="page-title">Teachers</h1>
//           <p className="page-subtitle">{state.teachers.length} faculty members · {state.teachers.filter(t => t.status === "active").length} active</p>
//         </div>
//         <button className="btn btn-primary" onClick={() => { setEditTeacher(null); setModalOpen(true); }}>
//           <Plus size={16} /> Add Teacher
//         </button>
//       </div>

//       <div className="card">
//         <DataTable
//           columns={columns}
//           data={state.teachers}
//           searchKeys={["name", "email", "subject"]}
//           emptyMessage="No teachers found."
//           actions={(row) => (
//             <>
//               <button className="btn btn-secondary btn-sm btn-icon" onClick={() => { setEditTeacher(row); setModalOpen(true); }}>
//                 <Pencil size={13} />
//               </button>
//               <button className="btn btn-danger btn-sm btn-icon" onClick={() => handleDelete(row.id, row.name)}>
//                 <Trash2 size={13} />
//               </button>
//             </>
//           )}
//         />
//       </div>

//       <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditTeacher(null); }} title={editTeacher ? "Edit Teacher" : "Add Teacher"}>
//         <TeacherForm onSubmit={handleSubmit} defaultValues={editTeacher || { status: "active" }} isSubmitting={submitting} />
//       </Modal>
//     </div>
//   );
// }


// src/pages/teachers/TeachersPage.js
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react";
import { useApp } from "../../context/AppContext";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import toast from "react-hot-toast";

const SUBJECTS = ["Mathematics", "Science", "English", "Physics", "Chemistry", "Biology", "History", "Computer Science"];

const schema = yup.object({
  name: yup.string().min(2, "Min 2 characters").required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^\d{10}$/, "Enter valid 10-digit number").required("Phone is required"),
  subject: yup.string().required("Subject is required"),
  experience: yup.string().required("Experience is required"),
  qualification: yup.string(),
  status: yup.string(),
});

const editSchema = yup.object({
  name: yup.string().min(2, "Min 2 characters").required("Name is required"),
  phone: yup.string().matches(/^\d{10}$/, "Enter valid 10-digit number").required("Phone is required"),
  subject: yup.string().required("Subject is required"),
  experience: yup.string().required("Experience is required"),
  qualification: yup.string(),
  status: yup.string(),
});

function TeacherForm({ onSubmit, defaultValues, isSubmitting, isEdit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(isEdit ? editSchema : schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="grid-2">
        <div className="input-group">
          <label className="input-label">Full Name *</label>
          <input className={`input ${errors.name ? "input-error" : ""}`} placeholder="Teacher name" {...register("name")} />
          {errors.name && <span className="error-text">{errors.name.message}</span>}
        </div>
        {!isEdit && (
          <div className="input-group">
            <label className="input-label">Email *</label>
            <input className={`input ${errors.email ? "input-error" : ""}`} placeholder="email@example.com" {...register("email")} />
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </div>
        )}
        <div className="input-group">
          <label className="input-label">Phone *</label>
          <input className={`input ${errors.phone ? "input-error" : ""}`} placeholder="10-digit number" {...register("phone")} />
          {errors.phone && <span className="error-text">{errors.phone.message}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Subject / Specialization *</label>
          <select className={`select ${errors.subject ? "input-error" : ""}`} {...register("subject")}>
            <option value="">Select subject</option>
            {SUBJECTS.map(s => <option key={s}>{s}</option>)}
          </select>
          {errors.subject && <span className="error-text">{errors.subject.message}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Experience *</label>
          <input className={`input ${errors.experience ? "input-error" : ""}`} placeholder="e.g. 5 years" {...register("experience")} />
          {errors.experience && <span className="error-text">{errors.experience.message}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Qualification</label>
          <input className="input" placeholder="e.g. MSc Mathematics" {...register("qualification")} />
        </div>
        <div className="input-group">
          <label className="input-label">Status</label>
          <select className="select" {...register("status")}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      {!isEdit && (
        <p style={{ fontSize: 12, color: "var(--text-muted)", background: "var(--bg-hover)", padding: "10px 14px", borderRadius: 8 }}>
          🔑 Default password: <strong>Teacher@123</strong> — teacher can change after first login.
        </p>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? <span className="spinner" /> : isEdit ? "Update Teacher" : "Add Teacher"}
        </button>
      </div>
    </form>
  );
}

export default function TeachersPage() {
  const { state, fetchTeachers, createTeacher, updateTeacher, deleteTeacher } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTeacher, setEditTeacher] = useState(null);

  // Load teachers from API on mount
  useEffect(() => { fetchTeachers(); }, [fetchTeachers]);

  const handleSubmit = async (data) => {
    let result;
    if (editTeacher) {
      result = await updateTeacher(editTeacher.id, data);
      if (result.success) toast.success("Teacher updated successfully!");
      else toast.error(result.message);
    } else {
      result = await createTeacher(data);
      if (result.success) toast.success("Teacher added successfully!");
      else toast.error(result.message);
    }
    if (result.success) { setModalOpen(false); setEditTeacher(null); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove ${name}? This cannot be undone.`)) return;
    const result = await deleteTeacher(id);
    if (result.success) toast.success("Teacher removed.");
    else toast.error(result.message);
  };

  const isLoading = state.loading.teachers;
  const isSubmitting = state.loading.submit;
  const activeCount = state.teachers.filter(t => t.status === "active").length;

  const columns = [
    {
      key: "name", label: "Teacher",
      render: (val, row) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="avatar" style={{ width: 34, height: 34, fontSize: 12, background: "linear-gradient(135deg, #10b981, #059669)" }}>
            {row.avatar}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{val}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: "subject", label: "Subject", render: v => <span className="badge badge-warning">{v || "—"}</span> },
    { key: "phone", label: "Phone", render: v => <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{v || "—"}</span> },
    { key: "experience", label: "Experience", render: v => <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{v || "—"}</span> },
    { key: "qualification", label: "Qualification", render: v => <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{v || "—"}</span> },
    { key: "students", label: "Students", render: v => <span style={{ fontWeight: 600, color: "var(--accent-light)" }}>{v || 0}</span> },
    { key: "status", label: "Status", render: v => <span className={`badge ${v === "active" ? "badge-success" : "badge-danger"}`}>{v}</span> },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Teachers</h1>
          <p className="page-subtitle">
            {isLoading ? "Loading…" : `${state.teachers.length} faculty members · ${activeCount} active`}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => fetchTeachers()} title="Refresh">
            <RefreshCw size={15} className={isLoading ? "spin" : ""} />
          </button>
          <button className="btn btn-primary" onClick={() => { setEditTeacher(null); setModalOpen(true); }}>
            <Plus size={16} /> Add Teacher
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { label: "Total Faculty", val: state.teachers.length, color: "var(--accent)" },
          { label: "Active", val: activeCount, color: "var(--success)" },
          { label: "Inactive", val: state.teachers.length - activeCount, color: "var(--danger)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "14px 20px", flex: "0 0 auto" }}>
            <div style={{ fontSize: 22, fontFamily: "var(--font-display)", fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        {isLoading && state.teachers.length === 0 ? (
          <div className="loading-overlay"><span className="spinner" style={{ width: 28, height: 28, borderWidth: 3 }} /></div>
        ) : (
          <DataTable
            columns={columns}
            data={state.teachers}
            searchKeys={["name", "email", "subject", "qualification"]}
            emptyMessage="No teachers found. Add your first teacher!"
            actions={(row) => (
              <>
                <button
                  className="btn btn-secondary btn-sm btn-icon"
                  onClick={() => { setEditTeacher(row); setModalOpen(true); }}
                  title="Edit"
                >
                  <Pencil size={13} />
                </button>
                <button
                  className="btn btn-danger btn-sm btn-icon"
                  onClick={() => handleDelete(row.id, row.name)}
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </>
            )}
          />
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditTeacher(null); }}
        title={editTeacher ? "Edit Teacher" : "Add New Teacher"}
      >
        <TeacherForm
          onSubmit={handleSubmit}
          defaultValues={editTeacher
            ? { name: editTeacher.name, phone: editTeacher.phone, subject: editTeacher.subject, experience: editTeacher.experience, qualification: editTeacher.qualification, status: editTeacher.status }
            : { status: "active" }
          }
          isSubmitting={isSubmitting}
          isEdit={!!editTeacher}
        />
      </Modal>

      <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}