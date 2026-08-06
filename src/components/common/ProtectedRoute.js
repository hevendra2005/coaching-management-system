// src/components/common/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function ProtectedRoute({ children }) {
  const { state } = useApp();
  if (!state.user) return <Navigate to="/login" replace />;
  return children;
}
