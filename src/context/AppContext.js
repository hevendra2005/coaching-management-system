// // src/context/AppContext.js
// import React, { createContext, useContext, useReducer, useEffect } from "react";
// import { mockStudents, mockTeachers, mockCourses, mockAttendance } from "../data/mockData";
// import api from "../services/api";

// const AppContext = createContext();

// const initialState = {
//   user: null,
//   theme: localStorage.getItem("theme") || "dark",
//   students: mockStudents,
//   teachers: mockTeachers,
//   courses: mockCourses,
//   attendance: mockAttendance,
//   loading: false,
//   error: null,
//   notifications: [],
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "SET_USER": return { ...state, user: action.payload };
//     case "LOGOUT": return { ...state, user: null };
//     case "TOGGLE_THEME":
//       const newTheme = state.theme === "dark" ? "light" : "dark";
//       localStorage.setItem("theme", newTheme);
//       return { ...state, theme: newTheme };

//     // Students
//     case "ADD_STUDENT": return { ...state, students: [...state.students, { ...action.payload, id: Date.now() }] };
//     case "UPDATE_STUDENT": return { ...state, students: state.students.map(s => s.id === action.payload.id ? action.payload : s) };
//     case "DELETE_STUDENT": return { ...state, students: state.students.filter(s => s.id !== action.payload) };

//     // Teachers
//     case "ADD_TEACHER": return { ...state, teachers: [...state.teachers, { ...action.payload, id: Date.now() }] };
//     case "UPDATE_TEACHER": return { ...state, teachers: state.teachers.map(t => t.id === action.payload.id ? action.payload : t) };
//     case "DELETE_TEACHER": return { ...state, teachers: state.teachers.filter(t => t.id !== action.payload) };

//     // Courses
//     case "ADD_COURSE": return { ...state, courses: [...state.courses, { ...action.payload, id: Date.now() }] };
//     case "UPDATE_COURSE": return { ...state, courses: state.courses.map(c => c.id === action.payload.id ? action.payload : c) };
//     case "DELETE_COURSE": return { ...state, courses: state.courses.filter(c => c.id !== action.payload) };

//     // Attendance
//     case "MARK_ATTENDANCE":
//       const exists = state.attendance.find(a => a.student === action.payload.student && a.date === action.payload.date && a.course === action.payload.course);
//       if (exists) {
//         return { ...state, attendance: state.attendance.map(a => (a.student === action.payload.student && a.date === action.payload.date) ? action.payload : a) };
//       }
//       return { ...state, attendance: [...state.attendance, { ...action.payload, id: Date.now() }] };

//     case "SET_LOADING": return { ...state, loading: action.payload };
//     case "SET_ERROR": return { ...state, error: action.payload };
//     default: return state;
//   }
// }

// export function AppProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", state.theme);
//     document.documentElement.className = state.theme;
//   }, [state.theme]);

//   // // Check for saved session
//   // useEffect(() => {
//   //   const savedUser = localStorage.getItem("cms_user");
//   //   if (savedUser) dispatch({ type: "SET_USER", payload: JSON.parse(savedUser) });
//   // }, []);

// // NEW — also validates the token is still present
// useEffect(() => {
//   const savedUser = localStorage.getItem("cms_user");
//   const token = localStorage.getItem("accessToken");
//   if (savedUser && token) {
//     dispatch({ type: "SET_USER", payload: JSON.parse(savedUser) });
//   }
// }, []);

//   const login = (userData) => {
//     localStorage.setItem("cms_user", JSON.stringify(userData));
//     dispatch({ type: "SET_USER", payload: userData });
//   };

//   // const logout = () => {
//   //   localStorage.removeItem("cms_user");
//   //   dispatch({ type: "LOGOUT" });
//   // };


// // NEW — also calls the backend to invalidate the refresh token
// const logout = async () => {
//   try {
//     await api.post("/auth/logout"); // tells backend to null the refreshToken in DB
//   } catch (_) {
//     // ignore — clear locally regardless
//   }
//   localStorage.removeItem("accessToken");
//   localStorage.removeItem("refreshToken");
//   localStorage.removeItem("cms_user");
//   dispatch({ type: "LOGOUT" });
// };

//   return (
//     <AppContext.Provider value={{ state, dispatch, login, logout }}>
//       {children}
//     </AppContext.Provider>
//   );
// }

// export const useApp = () => {
//   const ctx = useContext(AppContext);
//   if (!ctx) throw new Error("useApp must be used within AppProvider");
//   return ctx;
// };


// src/context/AppContext.js
import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import api from "../services/api";

const AppContext = createContext();

const initialState = {
  user: null,
  theme: localStorage.getItem("theme") || "dark",
  students: [], teachers: [], courses: [], attendance: [],
  studentsMeta: { page: 1, limit: 10, total: 0, totalPages: 1 },
  teachersMeta: { page: 1, limit: 10, total: 0, totalPages: 1 },
  coursesMeta:  { page: 1, limit: 10, total: 0, totalPages: 1 },
  loading: { students: false, teachers: false, courses: false, attendance: false, dashboard: false, submit: false },
  dashboardOverview: null,
  attendanceStats: null,
  enrollmentStats: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER": return { ...state, user: action.payload };
    case "LOGOUT": return { ...initialState, theme: state.theme, user: null };
    case "TOGGLE_THEME": {
      const t = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", t);
      return { ...state, theme: t };
    }
    case "SET_LOADING": return { ...state, loading: { ...state.loading, [action.resource]: action.payload } };
    case "SET_ERROR": return { ...state, error: action.payload };
    case "SET_STUDENTS": return { ...state, students: action.payload.data, studentsMeta: action.payload.pagination || state.studentsMeta };
    case "ADD_STUDENT": return { ...state, students: [action.payload, ...state.students] };
    case "UPDATE_STUDENT": return { ...state, students: state.students.map(s => s.id === action.payload.id ? action.payload : s) };
    case "DELETE_STUDENT": return { ...state, students: state.students.filter(s => s.id !== action.payload) };
    case "SET_TEACHERS": return { ...state, teachers: action.payload.data, teachersMeta: action.payload.pagination || state.teachersMeta };
    case "ADD_TEACHER": return { ...state, teachers: [action.payload, ...state.teachers] };
    case "UPDATE_TEACHER": return { ...state, teachers: state.teachers.map(t => t.id === action.payload.id ? action.payload : t) };
    case "DELETE_TEACHER": return { ...state, teachers: state.teachers.filter(t => t.id !== action.payload) };
    case "SET_COURSES": return { ...state, courses: action.payload.data, coursesMeta: action.payload.pagination || state.coursesMeta };
    case "ADD_COURSE": return { ...state, courses: [action.payload, ...state.courses] };
    case "UPDATE_COURSE": return { ...state, courses: state.courses.map(c => c.id === action.payload.id ? action.payload : c) };
    case "DELETE_COURSE": return { ...state, courses: state.courses.filter(c => c.id !== action.payload) };
    case "SET_ATTENDANCE": return { ...state, attendance: action.payload };
    case "SET_DASHBOARD_OVERVIEW": return { ...state, dashboardOverview: action.payload };
    case "SET_ATTENDANCE_STATS": return { ...state, attendanceStats: action.payload };
    case "SET_ENROLLMENT_STATS": return { ...state, enrollmentStats: action.payload };
    default: return state;
  }
}

const getErrMsg = (err) => err?.response?.data?.message || err?.message || "Something went wrong";

function initials(name = "") {
  return name.split(" ").map(n => n[0] || "").join("").toUpperCase().slice(0, 2);
}

function normaliseStudent(s) {
  if (!s) return s;
  const user = s.user || {};
  const firstEnrollment = s.enrollments?.[0];
  return {
    id: s.id, _rawId: s.id,
    name: user.name || s.name || "",
    email: user.email || s.email || "",
    phone: user.phone || s.phone || "",
    avatar: initials(user.name || s.name || ""),
    grade: s.grade || "",
    status: (s.status || "ACTIVE").toLowerCase(),
    course: firstEnrollment?.course?.name || s.course || "Not enrolled",
    courseId: firstEnrollment?.course?.id || null,
    joinDate: s.admissionDate ? s.admissionDate.slice(0, 10) : s.joinDate || "",
    rollNumber: s.rollNumber || "",
    schoolName: s.schoolName || "",
    parentName: s.parentName || "",
    parentPhone: s.parentPhone || "",
    enrollments: s.enrollments || [],
  };
}

function normaliseTeacher(t) {
  if (!t) return t;
  const user = t.user || {};
  const studentCount = t.courses?.reduce((sum, c) => sum + (c._count?.enrollments || 0), 0) || 0;
  return {
    id: t.id, _rawId: t.id,
    name: user.name || t.name || "",
    email: user.email || t.email || "",
    phone: user.phone || t.phone || "",
    avatar: initials(user.name || t.name || ""),
    subject: t.specialization || t.subject || "",
    specialization: t.specialization || t.subject || "",
    qualification: t.qualification || "",
    experience: t.experience || "",
    status: (t.status || "ACTIVE").toLowerCase(),
    students: studentCount,
    courses: t.courses || [],
    employeeId: t.employeeId || "",
  };
}

function normaliseCourse(c) {
  if (!c) return c;
  const teacherUser = c.teacher?.user || {};
  return {
    id: c.id, _rawId: c.id,
    name: c.name || "",
    code: c.code || "",
    subject: c.subject || c.name || "",
    grade: c.grade || "",
    description: c.description || "",
    teacher: teacherUser.name || "",
    teacherId: c.teacherId || c.teacher?.id || null,
    duration: c.duration || "",
    schedule: c.schedule || "",
    fee: Number(c.fee) || 0,
    maxStudents: c.maxStudents || 30,
    students: c._count?.enrollments || c.students || 0,
    status: (c.status || "ACTIVE").toLowerCase(),
  };
}

function normaliseAttendanceRecords(arr) {
  return arr.map(a => ({
    id: a.id,
    student: a.student?.user?.name || a.student || "",
    studentId: a.studentId || a.student?.id || "",
    course: a.course?.name || a.course || "",
    courseId: a.courseId || a.course?.id || "",
    date: a.date ? a.date.slice(0, 10) : "",
    status: (a.status || "").toLowerCase(),
    remarks: a.remarks || "",
  }));
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.documentElement.className = state.theme;
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  useEffect(() => {
    const savedUser = localStorage.getItem("cms_user");
    const token = localStorage.getItem("accessToken");
    if (savedUser && token) dispatch({ type: "SET_USER", payload: JSON.parse(savedUser) });
  }, []);

  const login = useCallback((userData) => {
    localStorage.setItem("cms_user", JSON.stringify(userData));
    dispatch({ type: "SET_USER", payload: userData });
  }, []);

  const logout = useCallback(async () => {
    try { await api.post("/auth/logout"); } catch (_) {}
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("cms_user");
    dispatch({ type: "LOGOUT" });
  }, []);

  // ── STUDENTS
  const fetchStudents = useCallback(async (params = {}) => {
    dispatch({ type: "SET_LOADING", resource: "students", payload: true });
    try {
      const res = await api.get("/students", { params: { limit: 100, ...params } });
      dispatch({ type: "SET_STUDENTS", payload: { data: (res.data.data || []).map(normaliseStudent), pagination: res.data.pagination } });
    } catch (err) { dispatch({ type: "SET_ERROR", payload: getErrMsg(err) }); }
    finally { dispatch({ type: "SET_LOADING", resource: "students", payload: false }); }
  }, []);

  const createStudent = useCallback(async (formData) => {
    dispatch({ type: "SET_LOADING", resource: "submit", payload: true });
    try {
      const res = await api.post("/students", {
        name: formData.name, email: formData.email, phone: formData.phone,
        grade: formData.grade, schoolName: formData.schoolName,
        parentName: formData.parentName, parentPhone: formData.parentPhone,
        password: "Student@123",
      });
      const raw = res.data.data?.student ?? res.data.data;
      if (raw) dispatch({ type: "ADD_STUDENT", payload: normaliseStudent(raw) });
      return { success: true };
    } catch (err) { return { success: false, message: getErrMsg(err) }; }
    finally { dispatch({ type: "SET_LOADING", resource: "submit", payload: false }); }
  }, []);

  const updateStudent = useCallback(async (id, formData) => {
    dispatch({ type: "SET_LOADING", resource: "submit", payload: true });
    try {
      const res = await api.patch(`/students/${id}`, {
        ...(formData.name && { name: formData.name }),
        ...(formData.phone && { phone: formData.phone }),
        ...(formData.grade && { grade: formData.grade }),
        ...(formData.status && { status: formData.status.toUpperCase() }),
        ...(formData.schoolName !== undefined && { schoolName: formData.schoolName }),
        ...(formData.parentName !== undefined && { parentName: formData.parentName }),
        ...(formData.parentPhone !== undefined && { parentPhone: formData.parentPhone }),
      });
      dispatch({ type: "UPDATE_STUDENT", payload: normaliseStudent(res.data.data) });
      return { success: true };
    } catch (err) { return { success: false, message: getErrMsg(err) }; }
    finally { dispatch({ type: "SET_LOADING", resource: "submit", payload: false }); }
  }, []);

  const deleteStudent = useCallback(async (id) => {
    try {
      await api.delete(`/students/${id}`);
      dispatch({ type: "DELETE_STUDENT", payload: id });
      return { success: true };
    } catch (err) { return { success: false, message: getErrMsg(err) }; }
  }, []);

  // ── TEACHERS
  const fetchTeachers = useCallback(async (params = {}) => {
    dispatch({ type: "SET_LOADING", resource: "teachers", payload: true });
    try {
      const res = await api.get("/teachers", { params: { limit: 100, ...params } });
      dispatch({ type: "SET_TEACHERS", payload: { data: (res.data.data || []).map(normaliseTeacher), pagination: res.data.pagination } });
    } catch (err) { dispatch({ type: "SET_ERROR", payload: getErrMsg(err) }); }
    finally { dispatch({ type: "SET_LOADING", resource: "teachers", payload: false }); }
  }, []);

  const createTeacher = useCallback(async (formData) => {
    dispatch({ type: "SET_LOADING", resource: "submit", payload: true });
    try {
      const res = await api.post("/teachers", {
        name: formData.name, email: formData.email, phone: formData.phone,
        specialization: formData.subject || formData.specialization,
        qualification: formData.qualification, experience: formData.experience,
        password: "Teacher@123",
      });
      const raw = res.data.data?.teacher ?? res.data.data;
      if (raw) dispatch({ type: "ADD_TEACHER", payload: normaliseTeacher(raw) });
      return { success: true };
    } catch (err) { return { success: false, message: getErrMsg(err) }; }
    finally { dispatch({ type: "SET_LOADING", resource: "submit", payload: false }); }
  }, []);

  const updateTeacher = useCallback(async (id, formData) => {
    dispatch({ type: "SET_LOADING", resource: "submit", payload: true });
    try {
      const res = await api.patch(`/teachers/${id}`, {
        ...(formData.name && { name: formData.name }),
        ...(formData.phone && { phone: formData.phone }),
        ...((formData.subject || formData.specialization) && { specialization: formData.subject || formData.specialization }),
        ...(formData.qualification !== undefined && { qualification: formData.qualification }),
        ...(formData.experience !== undefined && { experience: formData.experience }),
        ...(formData.status && { status: formData.status.toUpperCase() }),
      });
      dispatch({ type: "UPDATE_TEACHER", payload: normaliseTeacher(res.data.data) });
      return { success: true };
    } catch (err) { return { success: false, message: getErrMsg(err) }; }
    finally { dispatch({ type: "SET_LOADING", resource: "submit", payload: false }); }
  }, []);

  const deleteTeacher = useCallback(async (id) => {
    try {
      await api.delete(`/teachers/${id}`);
      dispatch({ type: "DELETE_TEACHER", payload: id });
      return { success: true };
    } catch (err) { return { success: false, message: getErrMsg(err) }; }
  }, []);

  // ── COURSES
  const fetchCourses = useCallback(async (params = {}) => {
    dispatch({ type: "SET_LOADING", resource: "courses", payload: true });
    try {
      const res = await api.get("/courses", { params: { limit: 100, ...params } });
      dispatch({ type: "SET_COURSES", payload: { data: (res.data.data || []).map(normaliseCourse), pagination: res.data.pagination } });
    } catch (err) { dispatch({ type: "SET_ERROR", payload: getErrMsg(err) }); }
    finally { dispatch({ type: "SET_LOADING", resource: "courses", payload: false }); }
  }, []);

  const createCourse = useCallback(async (formData, teachers) => {
    dispatch({ type: "SET_LOADING", resource: "submit", payload: true });
    try {
      let teacherId = null;
      if (formData.teacher) {
        const found = (teachers || []).find(t => t.name === formData.teacher || t.id === formData.teacher);
        teacherId = found?._rawId || found?.id || null;
      }
      const res = await api.post("/courses", {
        name: formData.name, code: formData.code,
        subject: formData.subject || formData.name,
        duration: formData.duration, schedule: formData.schedule,
        fee: parseFloat(formData.fee), maxStudents: parseInt(formData.maxStudents) || 30,
        grade: formData.grade, description: formData.description,
        status: (formData.status || "active").toUpperCase(),
        ...(teacherId && { teacherId }),
      });
      dispatch({ type: "ADD_COURSE", payload: normaliseCourse(res.data.data) });
      return { success: true };
    } catch (err) { return { success: false, message: getErrMsg(err) }; }
    finally { dispatch({ type: "SET_LOADING", resource: "submit", payload: false }); }
  }, []);

  const updateCourse = useCallback(async (id, formData, teachers) => {
    dispatch({ type: "SET_LOADING", resource: "submit", payload: true });
    try {
      let teacherId;
      if (formData.teacher !== undefined) {
        const found = (teachers || []).find(t => t.name === formData.teacher || t.id === formData.teacher);
        teacherId = found?._rawId || found?.id || null;
      }
      const res = await api.patch(`/courses/${id}`, {
        ...(formData.name && { name: formData.name }),
        ...(formData.subject && { subject: formData.subject }),
        ...(formData.duration && { duration: formData.duration }),
        ...(formData.schedule && { schedule: formData.schedule }),
        ...(formData.fee !== undefined && { fee: parseFloat(formData.fee) }),
        ...(formData.maxStudents !== undefined && { maxStudents: parseInt(formData.maxStudents) }),
        ...(formData.grade !== undefined && { grade: formData.grade }),
        ...(formData.description !== undefined && { description: formData.description }),
        ...(formData.status && { status: formData.status.toUpperCase() }),
        ...(teacherId !== undefined && { teacherId }),
      });
      dispatch({ type: "UPDATE_COURSE", payload: normaliseCourse(res.data.data) });
      return { success: true };
    } catch (err) { return { success: false, message: getErrMsg(err) }; }
    finally { dispatch({ type: "SET_LOADING", resource: "submit", payload: false }); }
  }, []);

  const deleteCourse = useCallback(async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      dispatch({ type: "DELETE_COURSE", payload: id });
      return { success: true };
    } catch (err) { return { success: false, message: getErrMsg(err) }; }
  }, []);

  // ── ATTENDANCE
  const markAttendance = useCallback(async (courseId, date, records) => {
    dispatch({ type: "SET_LOADING", resource: "attendance", payload: true });
    try {
      await api.post("/attendance", { courseId, date, records });
      return { success: true };
    } catch (err) { return { success: false, message: getErrMsg(err) }; }
    finally { dispatch({ type: "SET_LOADING", resource: "attendance", payload: false }); }
  }, []);

  const fetchAttendanceByDate = useCallback(async (date, courseId) => {
    dispatch({ type: "SET_LOADING", resource: "attendance", payload: true });
    try {
      const params = courseId ? { courseId } : {};
      const res = await api.get(`/attendance/date/${date}`, { params });
      const records = res.data.data?.records || res.data.data || [];
      dispatch({ type: "SET_ATTENDANCE", payload: normaliseAttendanceRecords(records) });
      return res.data.data;
    } catch (_) {
      dispatch({ type: "SET_ATTENDANCE", payload: [] });
      return null;
    } finally {
      dispatch({ type: "SET_LOADING", resource: "attendance", payload: false });
    }
  }, []);

  // ── DASHBOARD
  const fetchDashboardOverview = useCallback(async () => {
    dispatch({ type: "SET_LOADING", resource: "dashboard", payload: true });
    try {
      const res = await api.get("/dashboard/overview");
      dispatch({ type: "SET_DASHBOARD_OVERVIEW", payload: res.data.data });
    } catch (_) {}
    finally { dispatch({ type: "SET_LOADING", resource: "dashboard", payload: false }); }
  }, []);

  const fetchAttendanceStats = useCallback(async (params = {}) => {
    try {
      const res = await api.get("/dashboard/attendance-stats", { params });
      dispatch({ type: "SET_ATTENDANCE_STATS", payload: res.data.data });
      return res.data.data;
    } catch (_) { return null; }
  }, []);

  const fetchEnrollmentStats = useCallback(async () => {
    try {
      const res = await api.get("/dashboard/enrollment-stats");
      dispatch({ type: "SET_ENROLLMENT_STATS", payload: res.data.data });
      return res.data.data;
    } catch (_) { return null; }
  }, []);

  const fetchStudentDashboard = useCallback(async () => {
    try { const res = await api.get("/dashboard/student"); return res.data.data; }
    catch (_) { return null; }
  }, []);

  const fetchTeacherDashboard = useCallback(async () => {
    try { const res = await api.get("/dashboard/teacher"); return res.data.data; }
    catch (_) { return null; }
  }, []);

  return (
    <AppContext.Provider value={{
      state, dispatch, login, logout,
      fetchStudents, createStudent, updateStudent, deleteStudent,
      fetchTeachers, createTeacher, updateTeacher, deleteTeacher,
      fetchCourses, createCourse, updateCourse, deleteCourse,
      markAttendance, fetchAttendanceByDate,
      fetchDashboardOverview, fetchAttendanceStats, fetchEnrollmentStats,
      fetchStudentDashboard, fetchTeacherDashboard,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
