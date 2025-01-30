import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

const UserLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate loading delay
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Navbar />
      <Outlet /> {/* Child routes render here */}
      {!isLoading && <Footer />} {/* Render Footer only after loading */}
    </>
  );
};

export default UserLayout;
