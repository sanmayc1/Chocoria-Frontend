import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SideNavigation = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("/user/account-overview");
  useEffect(() => {
    setActive(window.location.pathname);
  }, [location.pathname]);

  return (
    <nav className="space-y-3">
      <button
        className={`w-full text-left px-3 py-2 rounded-2xl hover:bg-gray-200 font-medium ${
          active.includes("/user/account-overview") ? "bg-gray-200" : ""
        }`}
        onClick={() => {
          navigate("/user/account-overview");
        }}
      >
        Account Overview
      </button>
      <button
        className={`w-full text-left px-3 py-2 rounded-2xl hover:bg-gray-200 font-medium ${
          active.includes("/user/order") ? "bg-gray-200" : ""
        }`}
        onClick={() => {
          navigate("/user/order");
        }}
      >
        My Orders
      </button>
      <button
        className={`w-full text-left px-3 py-2 rounded-2xl hover:bg-gray-200 font-medium ${
          active.includes("/user/manage-address") ? "bg-gray-200" : ""
        }`}
        onClick={() => {
          navigate("/user/manage-address");
        }}
      >
        Saved Address
      </button>
      <button
        className={`w-full text-left px-3 py-2 rounded-2xl hover:bg-gray-200 font-medium ${
          active.includes("/user/wallet") ? "bg-gray-200" : ""
        }`}
        onClick={() => {
          navigate("/user/wallet");
        }}
      >
        Wallet
      </button>
      <button
        className={`w-full text-left px-3 py-2 rounded-2xl hover:bg-gray-200 font-medium ${
          active.includes("/user/referral") ? "bg-gray-200" : ""
        }`}
        onClick={() => {
          navigate("/user/referral");
        }}
      >
        Referral
      </button>
      <button
        className="w-full text-left px-3 py-2 rounded-2xl hover:bg-gray-200 text-red-600 font-medium"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default SideNavigation;
