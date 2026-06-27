import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // If user is already logged in, redirect them to the home page
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
