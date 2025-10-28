import { Outlet, Navigate } from "react-router";
import { useAuth } from "../../context/authContext";

function ProtectedRoute() {
  const { authUser } = useAuth();
  return <>{authUser ? <Outlet /> : <Navigate to="/login" replace />}</>;
}

export default ProtectedRoute;
