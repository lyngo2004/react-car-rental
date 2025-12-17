import { Navigate } from "react-router-dom";
import { isAdminFromToken } from "../../utils/authUtils";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) return <Navigate to="/login" replace />;
  if (!isAdminFromToken(token)) return <Navigate to="/home" replace />;

  return children;
};

export default AdminRoute;
