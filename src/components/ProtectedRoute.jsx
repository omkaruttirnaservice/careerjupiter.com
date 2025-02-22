import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../Pages/Login/LoginPage";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to={LoginPage} />;
  }

  return children;
};

export default ProtectedRoute;
