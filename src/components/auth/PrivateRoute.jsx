import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-neutral-900 text-neutral-100 flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default PrivateRoute;
