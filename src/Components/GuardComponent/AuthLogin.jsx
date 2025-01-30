import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLoginGuard = ({ children }) => {
  const [loading, setLoading] = useState(true); // Add loading state
  const auth = useSelector((state) => state.auth.auth);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && role === "user") {
      navigate("/");
    } else {
        setLoading(false);
    }
  }, [auth,role, navigate]);

  // Show loading screen until the user is authenticated
  if (loading) {
    return <div className="h-screen w-full flex justify-center items-center"><CircularProgress size={40}/></div>; // You can customize this loading screen
  } 

  return children;
};

export default AuthLoginGuard;