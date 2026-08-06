// // src/pages/students/StudentsPage.js
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Plus, Pencil, Trash2, UserCheck } from "lucide-react";
// import { useApp } from "../../context/AppContext";
// import DataTable from "../../components/common/DataTable";
// import Modal from "../../components/common/Modal";
// import toast from "react-hot-toast";

// const schema = yup.object({
//   name: yup.string().min(2).required("Name is required"),
//   email: yup.string().email().required("Email is required"),
//   phone: yup.string().min(10).required("Phone is required"),
//   course: yup.string().required("Course is required"),
//   grade: yup.string().required("Grade is required"),
// });

// const COURSES = ["Mathematics", "Science", "English", "Physics", "Chemistry", "Biology", "History"];
// const GRADES = ["8th", "9th", "10th", "11th", "12th"];

// function StudentForm({ onSubmit, defaultValues, isSubmitting }) {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues,
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//       <div className="grid-2">
//         <div className="input-group">
//           <label className="input-label">Full Name *</label>
//           <input className={`input ${errors.name ? "input-error" : ""}`} placeholder="Student name" {...register("name")} />
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
//           <label className="input-label">Course *</label>
//           <select className={`select ${errors.course ? "input-error" : ""}`} {...register("course")}>
//             <option value="">Select course</option>
//             {COURSES.map(c => <option key={c}>{c}</option>)}
//           </select>
//           {errors.course && <span className="error-text">{errors.course.message}</span>}
//         </div>
//         <div className="input-group">
//           <label className="input-label">Grade *</label>
//           <select className={`select ${errors.grade ? "input-error" : ""}`} {...register("grade")}>
//             <option value="">Select grade</option>
//             {GRADES.map(g => <option key={g}>{g}</option>)}
//           </select>
//           {errors.grade && <span className="error-text">{errors.grade.message}</span>}
//         </div>
//         <div className="input-group">
//           <label className="input-label">Status</label>
//           <select className="select" {...register("status")}>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>
//       </div>
//       <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
//         <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
//           {isSubmitting ? <span className="spinner" /> : defaultValues?.id ? "Update Student" : "Add Student"}
//         </button>
//       </div>
//     </form>
//   );
// }

// export default function StudentsPage() {
//   const { state, dispatch } = useApp();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editStudent, setEditStudent] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   const openAdd = () => { setEditStudent(null); setModalOpen(true); };
//   const openEdit = (s) => { setEditStudent(s); setModalOpen(true); };
//   const closeModal = () => { setModalOpen(false); setEditStudent(null); };

//   const handleSubmit = async (data) => {
//     setSubmitting(true);
//     await new Promise(r => setTimeout(r, 500));
//     if (editStudent) {
//       dispatch({ type: "UPDATE_STUDENT", payload: { ...editStudent, ...data } });
//       toast.success("Student updated!");
//     } else {
//       dispatch({ type: "ADD_STUDENT", payload: { ...data, status: data.status || "active", joinDate: new Date().toISOString().split("T")[0], avatar: data.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) } });
//       toast.success("Student added!");
//     }
//     setSubmitting(false);
//     closeModal();
//   };

//   const handleDelete = (id, name) => {
//     if (window.confirm(`Delete ${name}?`)) {
//       dispatch({ type: "DELETE_STUDENT", payload: id });
//       toast.success("Student removed");
//     }
//   };

//   const columns = [
//     { key: "name", label: "Student", render: (val, row) => (
//       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//         <div className="avatar" style={{ width: 30, height: 30, fontSize: 11 }}>{row.avatar}</div>
//         <div>
//           <div style={{ fontSize: 13, fontWeight: 500 }}>{val}</div>
//           <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{row.email}</div>
//         </div>
//       </div>
//     )},
//     { key: "phone", label: "Phone", render: v => <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{v}</span> },
//     { key: "course", label: "Course", render: v => <span className="badge badge-info">{v}</span> },
//     { key: "grade", label: "Grade", render: v => <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{v}</span> },
//     { key: "status", label: "Status", render: v => <span className={`badge ${v === "active" ? "badge-success" : "badge-danger"}`}>{v}</span> },
//     { key: "joinDate", label: "Joined", render: v => <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{v}</span> },
//   ];

//   const activeCount = state.students.filter(s => s.status === "active").length;

//   return (
//     <div className="animate-fade-in">
//       <div className="page-header">
//         <div>
//           <h1 className="page-title">Students</h1>
//           <p className="page-subtitle">{state.students.length} total · {activeCount} active</p>
//         </div>
//         <button className="btn btn-primary" onClick={openAdd}>
//           <Plus size={16} /> Add Student
//         </button>
//       </div>

//       {/* Quick stats */}
//       <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
//         {[
//           { label: "Total Enrolled", val: state.students.length, color: "var(--accent)" },
//           { label: "Active", val: activeCount, color: "var(--success)" },
//           { label: "Inactive", val: state.students.length - activeCount, color: "var(--danger)" },
//         ].map(s => (
//           <div key={s.label} className="card" style={{ padding: "14px 20px", flex: "0 0 auto" }}>
//             <div style={{ fontSize: 22, fontFamily: "var(--font-display)", fontWeight: 800, color: s.color }}>{s.val}</div>
//             <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
//           </div>
//         ))}
//       </div>

//       <div className="card">
//         <DataTable
//           columns={columns}
//           data={state.students}
//           searchKeys={["name", "email", "course", "grade"]}
//           emptyMessage="No students found. Add your first student!"
//           actions={(row) => (
//             <>
//               <button className="btn btn-secondary btn-sm btn-icon" onClick={() => openEdit(row)} title="Edit">
//                 <Pencil size={13} />
//               </button>
//               <button className="btn btn-danger btn-sm btn-icon" onClick={() => handleDelete(row.id, row.name)} title="Delete">
//                 <Trash2 size={13} />
//               </button>
//             </>
//           )}
//         />
//       </div>

//       <Modal isOpen={modalOpen} onClose={closeModal} title={editStudent ? "Edit Student" : "Add New Student"}>
//         <StudentForm
//           onSubmit={handleSubmit}
//           defaultValues={editStudent || { status: "active" }}
//           isSubmitting={submitting}
//         />
//       </Modal>
//     </div>
//   );
// }


// src/pages/students/StudentsPage.js
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react";
import { useApp } from "../../context/AppContext";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import toast from "react-hot-toast";

const GRADES = ["8th", "9th", "10th", "11th", "12th"];

const createSchema = yup.object({
  name: yup.string().min(2, "Min 2 characters").required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^\d{10}$/, "Enter valid 10-digit number").required("Phone is required"),
  grade: yup.string().required("Grade is required"),
  schoolName: yup.string(),
  parentName: yup.string(),
  parentPhone: yup.string().matches(/^(\d{10})?$/, "Enter valid 10-digit number").nullable(),
});

const editSchema = yup.object({
  name: yup.string().min(2, "Min 2 characters").required("Name is required"),
  phone: yup.string().matches(/^\d{10}$/, "Enter valid 10-digit number").required("Phone is required"),
  grade: yup.string().required("Grade is required"),
  schoolName: yup.string(),
  parentName: yup.string(),
  parentPhone: yup.string().matches(/^(\d{10})?$/, "Enter valid 10-digit number").nullable(),
  status: yup.string(),
});

function StudentForm({ onSubmit, defaultValues, isSubmitting, isEdit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(isEdit ? editSchema : createSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="grid-2">
        <div className="input-group">
          <label className="input-label">Full Name *</label>
          <input className={`input ${errors.name ? "input-error" : ""}`} placeholder="Student name" {...register("name")} />
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
          <label className="input-label">Grade *</label>
          <select className={`select ${errors.grade ? "input-error" : ""}`} {...register("grade")}>
            <option value="">Select grade</option>
            {GRADES.map(g => <option key={g}>{g}</option>)}
          </select>
          {errors.grade && <span className="error-text">{errors.grade.message}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">School Name</label>
          <input className="input" placeholder="Current school" {...register("schoolName")} />
        </div>
        <div className="input-group">
          <label className="input-label">Parent / Guardian Name</label>
          <input className="input" placeholder="Parent name" {...register("parentName")} />
        </div>
        <div className="input-group">
          <label className="input-label">Parent Phone</label>
          <input className="input" placeholder="10-digit number" {...register("parentPhone")} />
          {errors.parentPhone && <span className="error-text">{errors.parentPhone.message}</span>}
        </div>
        {isEdit && (
          <div className="input-group">
            <label className="input-label">Status</label>
            <select className="select" {...register("status")}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        )}
      </div>
      {!isEdit && (
        <p style={{ fontSize: 12, color: "var(--text-muted)", background: "var(--bg-hover)", padding: "10px 14px", borderRadius: 8 }}>
          🔑 Default password: <strong>Student@123</strong> — student can change after first login.
        </p>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? <span className="spinner" /> : isEdit ? "Update Student" : "Add Student"}
        </button>
      </div>
    </form>
  );
}

export default function StudentsPage() {
  const { state, fetchStudents, createStudent, updateStudent, deleteStudent } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  const handleSubmit = async (data) => {
    let result;
    if (editStudent) {
      result = await updateStudent(editStudent.id, data);
      if (result.success) toast.success("Student updated successfully!");
      else toast.error(result.message);
    } else {
      result = await createStudent(data);
      if (result.success) toast.success("Student added successfully!");
      else toast.error(result.message);
    }
    if (result.success) { setModalOpen(false); setEditStudent(null); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}? This will also remove their attendance records.`)) return;
    const result = await deleteStudent(id);
    if (result.success) toast.success("Student deleted.");
    else toast.error(result.message);
  };

  const isLoading = state.loading.students;
  const isSubmitting = state.loading.submit;
  const activeCount = state.students.filter(s => s.status === "active").length;

  const columns = [
    {
      key: "name", label: "Student",
      render: (val, row) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="avatar" style={{ width: 30, height: 30, fontSize: 11 }}>{row.avatar}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{val}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: "phone", label: "Phone", render: v => <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{v || "—"}</span> },
    { key: "grade", label: "Grade", render: v => <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{v}</span> },
    { key: "course", label: "Enrolled In", render: v => <span className="badge badge-info">{v}</span> },
    { key: "rollNumber", label: "Roll No.", render: v => <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "monospace" }}>{v}</span> },
    { key: "status", label: "Status", render: v => <span className={`badge ${v === "active" ? "badge-success" : "badge-danger"}`}>{v}</span> },
    { key: "joinDate", label: "Joined", render: v => <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{v}</span> },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Students</h1>
          <p className="page-subtitle">
            {isLoading ? "Loading…" : `${state.students.length} total · ${activeCount} active`}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => fetchStudents()} title="Refresh">
            <RefreshCw size={15} />
          </button>
          <button className="btn btn-primary" onClick={() => { setEditStudent(null); setModalOpen(true); }}>
            <Plus size={16} /> Add Student
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { label: "Total Enrolled", val: state.students.length, color: "var(--accent)" },
          { label: "Active", val: activeCount, color: "var(--success)" },
          { label: "Inactive", val: state.students.length - activeCount, color: "var(--danger)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "14px 20px", flex: "0 0 auto" }}>
            <div style={{ fontSize: 22, fontFamily: "var(--font-display)", fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        {isLoading && state.students.length === 0 ? (
          <div className="loading-overlay"><span className="spinner" style={{ width: 28, height: 28, borderWidth: 3 }} /></div>
        ) : (
          <DataTable
            columns={columns}
            data={state.students}
            searchKeys={["name", "email", "grade", "rollNumber"]}
            emptyMessage="No students found. Add your first student!"
            actions={(row) => (
              <>
                <button
                  className="btn btn-secondary btn-sm btn-icon"
                  onClick={() => { setEditStudent(row); setModalOpen(true); }}
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
        onClose={() => { setModalOpen(false); setEditStudent(null); }}
        title={editStudent ? "Edit Student" : "Add New Student"}
      >
        <StudentForm
          onSubmit={handleSubmit}
          defaultValues={editStudent
            ? { name: editStudent.name, phone: editStudent.phone, grade: editStudent.grade, schoolName: editStudent.schoolName, parentName: editStudent.parentName, parentPhone: editStudent.parentPhone, status: editStudent.status }
            : {}
          }
          isSubmitting={isSubmitting}
          isEdit={!!editStudent}
        />
      </Modal>
    </div>
  );
}