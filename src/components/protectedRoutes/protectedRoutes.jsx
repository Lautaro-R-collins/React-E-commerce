import { useUser } from "../../context/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { userInfo, loading } = useUser();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (Object.keys(userInfo).length === 0) {
    return <Navigate to="/login" replace />;
  }

  if (!userInfo.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutes;
