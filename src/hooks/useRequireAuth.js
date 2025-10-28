import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";

export function useRequireAuth() {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const runIfValidUser = (action) => {
    if (!authUser) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    action();
  };
  return {
    runIfValidUser,
  };
}

export default useRequireAuth;
