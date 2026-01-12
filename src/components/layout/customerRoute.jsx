import { Navigate } from "react-router-dom";
import { parseJwt } from "../../utils/authUtils";

const CustomerRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) return <Navigate to="/login" replace />;

  const payload = parseJwt(token);
  if (!payload) return <Navigate to="/login" replace />;

  // Nếu là Employee mà cố vào customer pages -> đá qua admin
  if (payload.role === "Employee") return <Navigate to="/admin/cars" replace />;

  // Nếu không phải Customer -> đá về login
  if (payload.role !== "Customer") return <Navigate to="/login" replace />;

  return children;
};

export default CustomerRoute;
