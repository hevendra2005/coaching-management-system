// // src/pages/auth/LoginPage.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
// import { useApp } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const loginSchema = yup.object({ email: yup.string().email("Invalid email").required("Email is required"), password: yup.string().min(4, "Min 4 characters").required("Password is required") });
// const signupSchema = yup.object({ name: yup.string().min(2, "Min 2 characters").required("Name is required"), email: yup.string().email("Invalid email").required("Email is required"), password: yup.string().min(4, "Min 4 characters").required("Password is required"), role: yup.string().required("Select a role") });

// const DEMO_ACCOUNTS = [
//   { email: "admin@coachpro.com", password: "admin", role: "Admin", name: "Admin User" },
//   { email: "teacher@coachpro.com", password: "teacher", role: "Teacher", name: "Dr. Ramesh Kumar" },
//   { email: "student@coachpro.com", password: "student", role: "Student", name: "Aarav Sharma" },
// ];

// export default function LoginPage() {
//   const [isSignup, setIsSignup] = useState(false);
//   const [showPw, setShowPw] = useState(false);
//   const { login } = useApp();
//   const navigate = useNavigate();

//   const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm({
//     resolver: yupResolver(isSignup ? signupSchema : loginSchema),
//   });

//   const onSubmit = async (data) => {
//     await new Promise(r => setTimeout(r, 800));
//     if (isSignup) {
//       login({ name: data.name, email: data.email, role: data.role });
//       toast.success(`Welcome, ${data.name}!`);
//     } else {
//       const account = DEMO_ACCOUNTS.find(a => a.email === data.email && a.password === data.password);
//       if (!account) { toast.error("Invalid credentials. Try demo accounts below."); return; }
//       login(account);
//       toast.success(`Welcome back, ${account.name}!`);
//     }
//     navigate("/dashboard");
//   };

//   const loginAs = (account) => {
//     setValue("email", account.email);
//     setValue("password", account.password);
//     toast.success(`Filled demo credentials for ${account.role}`);
//   };

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "var(--bg-primary)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: 20,
//       position: "relative",
//       overflow: "hidden",
//     }}>
//       {/* Background decoration */}
//       <div style={{ position: "absolute", top: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "var(--accent)", opacity: 0.04, filter: "blur(80px)", pointerEvents: "none" }} />
//       <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "#8b5cf6", opacity: 0.04, filter: "blur(100px)", pointerEvents: "none" }} />

//       <div style={{ width: "100%", maxWidth: 920, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, background: "var(--bg-card)", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
//         {/* Left panel */}
//         <div style={{
//           background: "linear-gradient(145deg, #1a0a3d 0%, #0f0728 50%, #160d35 100%)",
//           padding: "60px 48px",
//           display: "flex", flexDirection: "column", justifyContent: "space-between",
//         }}>
//           <div>
//             <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
//               <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <Sparkles size={18} color="white" />
//               </div>
//               <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "white" }}>CoachPro</span>
//             </div>
//             <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: 16 }}>
//               Manage Your Coaching Center with Ease
//             </h2>
//             <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7 }}>
//               Track students, manage courses, and monitor attendance — all in one beautiful platform.
//             </p>
//           </div>
//           <div>
//             <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Quick Demo Access</p>
//             {DEMO_ACCOUNTS.map(acc => (
//               <button key={acc.role} onClick={() => loginAs(acc)} style={{
//                 display: "flex", alignItems: "center", justifyContent: "space-between",
//                 width: "100%", padding: "10px 14px", marginBottom: 8,
//                 background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
//                 borderRadius: 8, color: "white", cursor: "pointer", fontSize: 13,
//                 transition: "var(--transition)",
//               }}
//                 onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
//                 onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
//               >
//                 <span>{acc.role}</span>
//                 <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{acc.email}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Right panel - Form */}
//         <div style={{ padding: "60px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
//           <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
//             {isSignup ? "Create Account" : "Welcome Back"}
//           </h3>
//           <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 32 }}>
//             {isSignup ? "Join CoachPro today" : "Sign in to your account"}
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             {isSignup && (
//               <div className="input-group">
//                 <label className="input-label">Full Name</label>
//                 <input className={`input ${errors.name ? "input-error" : ""}`} placeholder="Your full name" {...register("name")} />
//                 {errors.name && <span className="error-text">{errors.name.message}</span>}
//               </div>
//             )}
//             <div className="input-group">
//               <label className="input-label">Email Address</label>
//               <input className={`input ${errors.email ? "input-error" : ""}`} placeholder="you@example.com" type="email" {...register("email")} />
//               {errors.email && <span className="error-text">{errors.email.message}</span>}
//             </div>
//             <div className="input-group">
//               <label className="input-label">Password</label>
//               <div style={{ position: "relative" }}>
//                 <input className={`input ${errors.password ? "input-error" : ""}`} placeholder="••••••••" type={showPw ? "text" : "password"} style={{ paddingRight: 44 }} {...register("password")} />
//                 <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
//                   {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>
//               {errors.password && <span className="error-text">{errors.password.message}</span>}
//             </div>
//             {isSignup && (
//               <div className="input-group">
//                 <label className="input-label">Role</label>
//                 <select className={`select ${errors.role ? "input-error" : ""}`} {...register("role")}>
//                   <option value="">Select role</option>
//                   <option value="Admin">Admin</option>
//                   <option value="Teacher">Teacher</option>
//                   <option value="Student">Student</option>
//                 </select>
//                 {errors.role && <span className="error-text">{errors.role.message}</span>}
//               </div>
//             )}
//             <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting} style={{ marginTop: 8, justifyContent: "center" }}>
//               {isSubmitting ? <span className="spinner" /> : <><span>{isSignup ? "Create Account" : "Sign In"}</span><ArrowRight size={16} /></>}
//             </button>
//           </form>

//           <div style={{ marginTop: 24, textAlign: "center" }}>
//             <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
//               {isSignup ? "Already have an account? " : "Don't have an account? "}
//             </span>
//             <button onClick={() => { setIsSignup(!isSignup); reset(); }} style={{ background: "none", border: "none", color: "var(--accent-light)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
//               {isSignup ? "Sign In" : "Sign Up"}
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>{`@media(max-width:640px){.login-grid{grid-template-columns:1fr!important}.login-left{display:none!important}}`}</style>
//     </div>
//   );
// }


// src/pages/auth/LoginPage.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import api from "../../services/api";
import toast from "react-hot-toast";

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(4, "Min 4 characters").required("Password is required"),
});

const signupSchema = yup.object({
  name: yup.string().min(2, "Min 2 characters").required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Must have uppercase, lowercase & number")
    .required("Password is required"),
  role: yup.string().required("Select a role"),
});

// Demo credentials that match the backend seed data
// const DEMO_ACCOUNTS = [
//   { email: "admin@coachpro.com",   password: "admin123",   role: "Admin"   },
//   { email: "ramesh@coachpro.com",  password: "teacher123", role: "Teacher" },
//   { email: "aarav@student.com",    password: "student123", role: "Student" },
// ];

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(isSignup ? signupSchema : loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (isSignup) {
        // ── REGISTER via backend API
        const res = await api.post("/auth/register", {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role.toUpperCase(), // backend expects ADMIN / TEACHER / STUDENT
        });

        const { user, accessToken, refreshToken } = res.data.data;

        // Persist tokens
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Store user in context (normalise role to Title Case for UI)
        login({ ...user, role: capitalise(user.role) });
        toast.success(`Welcome, ${user.name}!`);

      } else {
        // ── LOGIN via backend API
        const res = await api.post("/auth/login", {
          email: data.email,
          password: data.password,
        });

        const { user, accessToken, refreshToken } = res.data.data;

        // Persist tokens
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Store user in context
        login({ ...user, role: capitalise(user.role) });
        toast.success(`Welcome back, ${user.name}!`);
      }

      navigate("/dashboard");

    } catch (err) {
      // err.response.data comes from your backend's standardised error format
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const loginAs = (account) => {
    setValue("email", account.email);
    setValue("password", account.password);
    toast.success(`Credentials filled for ${account.role}`);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg-primary)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "var(--accent)", opacity: 0.04, filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "#8b5cf6", opacity: 0.04, filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{
        width: "100%", maxWidth: 920, display: "grid",
        gridTemplateColumns: "1fr 1fr", background: "var(--bg-card)",
        borderRadius: "var(--radius-xl)", border: "1px solid var(--border)",
        overflow: "hidden", boxShadow: "var(--shadow-lg)",
      }}>
        {/* ── Left panel */}
        <div style={{
          background: "linear-gradient(145deg, #1a0a3d 0%, #0f0728 50%, #160d35 100%)",
          padding: "60px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={18} color="white" />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "white" }}>CoachPro</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: 16 }}>
              Manage Your Coaching Center with Ease
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7 }}>
              Dynamic authentication — credentials are validated against the real database on every login.
            </p>
          </div>

          {/* Demo accounts */}
          <div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Quick Demo Access
            </p>
            {/* {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.role}
                onClick={() => loginAs(acc)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "10px 14px", marginBottom: 8,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8, color: "white", cursor: "pointer", fontSize: 13,
                  transition: "var(--transition)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
              >
                <span>{acc.role}</span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{acc.email}</span>
              </button>
            ))} */}
          </div>
        </div>

        {/* ── Right panel: form */}
        <div style={{ padding: "60px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
            {isSignup ? "Create Account" : "Welcome Back"}
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 32 }}>
            {isSignup ? "Register via live API" : "Sign in with your real credentials"}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {isSignup && (
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input className={`input ${errors.name ? "input-error" : ""}`} placeholder="Your full name" {...register("name")} />
                {errors.name && <span className="error-text">{errors.name.message}</span>}
              </div>
            )}

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input className={`input ${errors.email ? "input-error" : ""}`} placeholder="you@example.com" type="email" {...register("email")} />
              {errors.email && <span className="error-text">{errors.email.message}</span>}
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className={`input ${errors.password ? "input-error" : ""}`}
                  placeholder="••••••••"
                  type={showPw ? "text" : "password"}
                  style={{ paddingRight: 44 }}
                  {...register("password")}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password.message}</span>}
            </div>

            {isSignup && (
              <div className="input-group">
                <label className="input-label">Role</label>
                <select className={`select ${errors.role ? "input-error" : ""}`} {...register("role")}>
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                </select>
                {errors.role && <span className="error-text">{errors.role.message}</span>}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
              style={{ marginTop: 8, justifyContent: "center" }}
            >
              {isSubmitting
                ? <span className="spinner" />
                : <><span>{isSignup ? "Create Account" : "Sign In"}</span><ArrowRight size={16} /></>
              }
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
              {isSignup ? "Already have an account? " : "Don't have an account? "}
            </span>
            <button
              onClick={() => { setIsSignup(!isSignup); reset(); }}
              style={{ background: "none", border: "none", color: "var(--accent-light)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:640px){ .login-grid { grid-template-columns:1fr!important } }`}</style>
    </div>
  );
}

// Helper: "ADMIN" → "Admin"
function capitalise(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
