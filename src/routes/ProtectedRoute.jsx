import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (!user && !loading) {
    return <Navigate to="/login" />;
  }
  if (loading) {
    return <h1>Loading</h1>;
  }
  return children;
};

export default ProtectedRoute;
