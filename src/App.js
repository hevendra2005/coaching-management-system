// src/App.js
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicLayout from "./components/layout/PublicLayout";
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import AdmissionPage from "./pages/public/AdmissionPage";
import ContactPage from "./pages/public/ContactPage";

// Lazy load pages
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const DashboardPage = lazy(() => import("./pages/dashboard/DashboardPage"));
const StudentsPage = lazy(() => import("./pages/students/StudentsPage"));
const TeachersPage = lazy(() => import("./pages/teachers/TeachersPage"));
const CoursesPage = lazy(() => import("./pages/courses/CoursesPage"));
const AttendancePage = lazy(() => import("./pages/attendance/AttendancePage"));

function PageLoader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", minHeight: 300 }}>
      <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
    </div>
  );
}

// export default function App() {
//   return (
//     <AppProvider>
//       <BrowserRouter>
//         <Suspense fallback={<PageLoader />}>
//           <Routes>
//             <Route path="/login" element={<LoginPage />} />
//              <Route path="/" element={<Navigate to="/home" replace />} />
//             <Route path="/" element={
//               <ProtectedRoute>
//                 <PublicLayout />
//               </ProtectedRoute>
//             }>
//              <Route path="/home" element={<HomePage />} />
//               <Route path="/about" element={<AboutPage />} />
//               <Route path="/admission" element={<AdmissionPage />} />
//               <Route path="/contact" element={<ContactPage />} />
//             </Route>



//             <Route path="/" element={<Navigate to="/dashboard" replace />} />
//             <Route path="/" element={
//               <ProtectedRoute>
//                 <AppLayout />
//               </ProtectedRoute>
//             }>
//               <Route path="dashboard" element={<DashboardPage />} />
//               <Route path="students" element={<StudentsPage />} />
//               <Route path="teachers" element={<TeachersPage />} />
//               <Route path="courses" element={<CoursesPage />} />
//               <Route path="attendance" element={<AttendancePage />} />
//             </Route>
//             <Route path="*" element={<Navigate to="/dashboard" replace />} />
//           </Routes>
//         </Suspense>

//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 3000,
//             style: {
//               background: "var(--bg-card)",
//               color: "var(--text-primary)",
//               border: "1px solid var(--border)",
//               borderRadius: "var(--radius-sm)",
//               fontSize: 13,
//               fontFamily: "var(--font-body)",
//             },
//             success: { iconTheme: { primary: "#10b981", secondary: "white" } },
//             error: { iconTheme: { primary: "#ef4444", secondary: "white" } },
//           }}
//         />
//       </BrowserRouter>
//     </AppProvider>
//   );
// }

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              {/* <Route index element={<Navigate to="/home" replace />} /> */}
              <Route path="home" element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="admission" element={<AdmissionPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="students" element={<StudentsPage />} />
              <Route path="teachers" element={<TeachersPage />} />
              <Route path="courses" element={<CoursesPage />} />
              <Route path="attendance" element={<AttendancePage />} />
            </Route>

            {/* Fallback */}
            {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}
           <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        <Toaster position="top-right" />
      </BrowserRouter>
    </AppProvider>
  );
}
