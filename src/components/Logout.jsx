import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // send login
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
