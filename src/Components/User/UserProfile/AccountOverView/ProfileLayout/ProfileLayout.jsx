
import { User, Menu, X } from "lucide-react";
import SideNavigation from "./SideNavigation.jsx";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get_user, user_logout } from "../../../../../Services/api/api.js";
import { auth_False } from "../../../../../Store/Slice/authSlice.jsx";
import { toast } from "react-toastify";


const ProfileLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    // logout 
    const handleLogout = async () => {
      await user_logout();
      dispatch(auth_False());
    };
  
    // fetch user details
    useEffect(() => {
      const fetchUser = async () => {
        const response = await get_user();
       if (response.status === 200) {
        const name = response.data.user.username.split(" ").map((name)=>name.charAt(0).toUpperCase()+name.slice(1).toLowerCase()).join(" ")
        setUsername(name);
        return
      }
      toast.error(response.response.data.message);
      };
      fetchUser();
    },[]);
    
    

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <div className="min-h-screen py-6">
        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-auto rounded-3xl shadow-md border border-black p-4 md:p-8 lg:p-14 ">
          {/* Mobile Header */}
          <div className="flex md:hidden items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
              <div className="text-lg font-medium">{username}</div>
            </div>
            <button onClick={toggleMobileMenu} className="p-2">
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
  
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mb-6 border-b pb-4">
              <SideNavigation handleLogout={handleLogout} />
            </div>
          )}
  
          <div className="flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-48 border-grey-200 border-r-2 pr-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <User className="w-8 h-8 text-gray-500" />
                </div>
                <div className="text-lg font-medium">{username}</div>
              </div>
              <SideNavigation handleLogout={handleLogout} />
            </div>
  
            {/* Main Content */}
            <div className="flex-1 md:pl-8">
  
              <Outlet/>
  
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProfileLayout;