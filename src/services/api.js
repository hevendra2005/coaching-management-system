// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api/v1', // backend URL
// });

// export default api;


// src/services/api.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Attach JWT to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-refresh token on 401
let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const orig = error.config;
    if (error.response?.status === 401 && !orig._retry) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) { clearSession(); return Promise.reject(error); }
      if (isRefreshing) {
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
          .then((token) => { orig.headers.Authorization = `Bearer ${token}`; return api(orig); })
          .catch((e) => Promise.reject(e));
      }
      orig._retry = true;
      isRefreshing = true;
      try {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
        const { accessToken, refreshToken: newRefresh } = data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefresh);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        orig.headers.Authorization = `Bearer ${accessToken}`;
        return api(orig);
      } catch (e) {
        processQueue(e, null);
        clearSession();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export const clearSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("cms_user");
  if (!window.location.pathname.includes("/login")) window.location.href = "/login";
};

export default api;

export const authService = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (data) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  refresh: (refreshToken) => api.post("/auth/refresh", { refreshToken }),
};

export const studentService = {
  getAll: (params = {}) => api.get("/students", { params }),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post("/students", data),
  update: (id, data) => api.patch(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
  enroll: (studentId, courseId) => api.post(`/students/${studentId}/enroll`, { courseId }),
};

export const teacherService = {
  getAll: (params = {}) => api.get("/teachers", { params }),
  getById: (id) => api.get(`/teachers/${id}`),
  create: (data) => api.post("/teachers", data),
  update: (id, data) => api.patch(`/teachers/${id}`, data),
  delete: (id) => api.delete(`/teachers/${id}`),
};

export const courseService = {
  getAll: (params = {}) => api.get("/courses", { params }),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post("/courses", data),
  update: (id, data) => api.patch(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
  assignTeacher: (courseId, teacherId) =>
    api.patch(`/courses/${courseId}/assign-teacher`, { teacherId }),
};

export const attendanceService = {
  mark: (courseId, date, records) =>
    api.post("/attendance", { courseId, date, records }),
  getByCourse: (courseId, params = {}) =>
    api.get(`/attendance/course/${courseId}`, { params }),
  getByStudent: (studentId, params = {}) =>
    api.get(`/attendance/student/${studentId}`, { params }),
  getByDate: (date, params = {}) =>
    api.get(`/attendance/date/${date}`, { params }),
};

export const dashboardService = {
  getOverview: () => api.get("/dashboard/overview"),
  getAttendanceStats: (params = {}) => api.get("/dashboard/attendance-stats", { params }),
  getEnrollmentStats: () => api.get("/dashboard/enrollment-stats"),
  getRevenueStats: () => api.get("/dashboard/revenue-stats"),
  getStudentDashboard: () => api.get("/dashboard/student"),
  getTeacherDashboard: () => api.get("/dashboard/teacher"),
};