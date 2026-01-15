import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const auth = useSelector((state) => state.auth)
  const user = auth.user

  console.log("🔎 ProtectedRoute: ", auth);
  console.log("📌 allowedRoles:", allowedRoles);

  if (!user || !user.roles) return <div>Loading user info...</div>;

  const userRoles = user.roles

  const isAuthorized = allowedRoles.some((role) => userRoles.includes(role))

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children
};

export default ProtectedRoute;
