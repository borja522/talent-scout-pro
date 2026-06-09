import { Navigate } from "react-router-dom";
import { useApp, type Role } from "@/contexts/AppContext";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children, role }: { children: ReactNode; role?: Role }) => {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={user.role === "admin" ? "/admin" : "/candidate"} replace />;
  return <>{children}</>;
};
