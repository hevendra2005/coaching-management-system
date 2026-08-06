// // src/components/layout/Sidebar.js
// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard, Users, GraduationCap, BookOpen,
//   ClipboardList, LogOut, ChevronLeft, ChevronRight,
//   Sparkles, Bell
// } from "lucide-react";
// import { useApp } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const navItems = [
//   { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
//   { path: "/students", icon: GraduationCap, label: "Students" },
//   { path: "/teachers", icon: Users, label: "Teachers" },
//   { path: "/courses", icon: BookOpen, label: "Courses" },
//   { path: "/attendance", icon: ClipboardList, label: "Attendance" },
// ];

// export default function Sidebar({ collapsed, onToggle }) {
//   const { state, logout, dispatch } = useApp();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   return (
//     <aside
//       style={{
//         width: collapsed ? 70 : "var(--sidebar-width)",
//         background: "var(--sidebar-bg)",
//         borderRight: "1px solid var(--sidebar-border)",
//         display: "flex",
//         flexDirection: "column",
//         position: "fixed",
//         top: 0, left: 0, bottom: 0,
//         zIndex: 100,
//         transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//         overflow: "hidden",
//       }}
//     >
//       {/* Logo */}
//       <div style={{
//         padding: collapsed ? "20px 0" : "24px 20px",
//         borderBottom: "1px solid var(--sidebar-border)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: collapsed ? "center" : "space-between",
//         minHeight: 72,
//       }}>
//         {!collapsed && (
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <div style={{
//               width: 32, height: 32, borderRadius: 8,
//               background: "linear-gradient(135deg, var(--accent), #8b5cf6)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//             }}>
//               <Sparkles size={16} color="white" />
//             </div>
//             <div>
//               <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, lineHeight: 1 }}>CoachPro</div>
//               <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>Management System</div>
//             </div>
//           </div>
//         )}
//         {collapsed && (
//           <div style={{
//             width: 32, height: 32, borderRadius: 8,
//             background: "linear-gradient(135deg, var(--accent), #8b5cf6)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//           }}>
//             <Sparkles size={16} color="white" />
//           </div>
//         )}
//         <button
//           onClick={onToggle}
//           style={{
//             background: "var(--bg-hover)",
//             border: "1px solid var(--border)",
//             borderRadius: 6,
//             width: 24, height: 24,
//             display: "flex", alignItems: "center", justifyContent: "center",
//             cursor: "pointer", color: "var(--text-secondary)",
//             flexShrink: 0,
//             ...(collapsed && { position: "absolute", right: -12, top: 24, zIndex: 10 }),
//           }}
//         >
//           {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
//         </button>
//       </div>

//       {/* User Info */}
//       {!collapsed && state.user && (
//         <div style={{
//           padding: "16px 20px",
//           borderBottom: "1px solid var(--sidebar-border)",
//         }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <div className="avatar" style={{ width: 36, height: 36, fontSize: 12 }}>
//               {state.user.name?.charAt(0).toUpperCase()}
//             </div>
//             <div style={{ overflow: "hidden" }}>
//               <div style={{ fontSize: 13, fontWeight: 600, truncate: true }}>{state.user.name}</div>
//               <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
//                 <span className="badge badge-purple" style={{ padding: "1px 7px", fontSize: 10 }}>{state.user.role}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Nav Items */}
//       <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
//         {navItems.map(({ path, icon: Icon, label }) => (
//           <NavLink
//             key={path}
//             to={path}
//             style={({ isActive }) => ({
//               display: "flex",
//               alignItems: "center",
//               gap: 12,
//               padding: collapsed ? "12px 0" : "10px 14px",
//               borderRadius: "var(--radius-sm)",
//               marginBottom: 4,
//               textDecoration: "none",
//               justifyContent: collapsed ? "center" : "flex-start",
//               transition: "var(--transition)",
//               color: isActive ? "var(--accent-light)" : "var(--text-secondary)",
//               background: isActive ? "var(--accent)18" : "transparent",
//               border: isActive ? "1px solid var(--accent)30" : "1px solid transparent",
//               fontWeight: isActive ? 600 : 400,
//             })}
//             title={collapsed ? label : undefined}
//           >
//             <Icon size={18} style={{ flexShrink: 0 }} />
//             {!collapsed && <span style={{ fontSize: 14 }}>{label}</span>}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Bottom Actions */}
//       <div style={{ padding: "12px 10px", borderTop: "1px solid var(--sidebar-border)" }}>
//         <button
//           onClick={handleLogout}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 12,
//             padding: collapsed ? "12px 0" : "10px 14px",
//             borderRadius: "var(--radius-sm)",
//             width: "100%",
//             justifyContent: collapsed ? "center" : "flex-start",
//             background: "transparent",
//             border: "1px solid transparent",
//             color: "var(--danger)",
//             cursor: "pointer",
//             fontSize: 14,
//             transition: "var(--transition)",
//           }}
//           onMouseEnter={e => e.currentTarget.style.background = "var(--danger)14"}
//           onMouseLeave={e => e.currentTarget.style.background = "transparent"}
//         >
//           <LogOut size={18} style={{ flexShrink: 0 }} />
//           {!collapsed && <span>Logout</span>}
//         </button>
//       </div>
//     </aside>
//   );
// }


// src/components/layout/Sidebar.js
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen,
  ClipboardList, LogOut, ChevronLeft, ChevronRight,
  Sparkles, Bell
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import toast from "react-hot-toast";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/students", icon: GraduationCap, label: "Students" },
  { path: "/teachers", icon: Users, label: "Teachers" },
  { path: "/courses", icon: BookOpen, label: "Courses" },
  { path: "/attendance", icon: ClipboardList, label: "Attendance" },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { state, logout, dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/home");
  };

  return (
    <aside
      style={{
        width: collapsed ? 70 : "var(--sidebar-width)",
        background: "var(--sidebar-bg)",
        borderRight: "1px solid var(--sidebar-border)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0, left: 0, bottom: 0,
        zIndex: 100,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div style={{
        padding: collapsed ? "20px 0" : "24px 20px",
        borderBottom: "1px solid var(--sidebar-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        minHeight: 72,
      }}>
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, var(--accent), #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Sparkles size={16} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, lineHeight: 1 }}>CoachPro</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>Management System</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, var(--accent), #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Sparkles size={16} color="white" />
          </div>
        )}
        <button
          onClick={onToggle}
          style={{
            background: "var(--bg-hover)",
            border: "1px solid var(--border)",
            borderRadius: 6,
            width: 24, height: 24,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--text-secondary)",
            flexShrink: 0,
            ...(collapsed && { position: "absolute", right: -12, top: 24, zIndex: 10 }),
          }}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>

      {/* User Info */}
      {!collapsed && state.user && (
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--sidebar-border)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="avatar" style={{ width: 36, height: 36, fontSize: 12 }}>
              {state.user.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 600, truncate: true }}>{state.user.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                <span className="badge badge-purple" style={{ padding: "1px 7px", fontSize: 10 }}>{state.user.role}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: collapsed ? "12px 0" : "10px 14px",
              borderRadius: "var(--radius-sm)",
              marginBottom: 4,
              textDecoration: "none",
              justifyContent: collapsed ? "center" : "flex-start",
              transition: "var(--transition)",
              color: isActive ? "var(--accent-light)" : "var(--text-secondary)",
              background: isActive ? "var(--accent)18" : "transparent",
              border: isActive ? "1px solid var(--accent)30" : "1px solid transparent",
              fontWeight: isActive ? 600 : 400,
            })}
            title={collapsed ? label : undefined}
          >
            <Icon size={18} style={{ flexShrink: 0 }} />
            {!collapsed && <span style={{ fontSize: 14 }}>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid var(--sidebar-border)" }}>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: collapsed ? "12px 0" : "10px 14px",
            borderRadius: "var(--radius-sm)",
            width: "100%",
            justifyContent: collapsed ? "center" : "flex-start",
            background: "transparent",
            border: "1px solid transparent",
            color: "var(--danger)",
            cursor: "pointer",
            fontSize: 14,
            transition: "var(--transition)",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--danger)14"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <LogOut size={18} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}