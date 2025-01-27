import React, { useEffect, useState } from "react";
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  Users,
  Gift,
  Bell,
  MessageCircle,
  Ticket,
  ImagePlus,
  FolderTree,
  LogOut,
  Menu,
  X,
  Star,
} from "lucide-react";
import SidebarItem from "../HelperComponents/SidebarItems.jsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { user_logout } from "../../../Services/api/api.js";
import { auth_False } from "../../../Store/Slice/authSlice.jsx";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [select, setSelect] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setSelect(location.pathname);
  }, [location.pathname]);

  // Dummy data
  const stats = {
    totalUsers: 40689,
    totalOrders: 10293,
    totalSales: 89000,
    userGrowth: 8.5,
    orderGrowth: 1.3,
    salesGrowth: -4.3,
  };

  const orders = [
    {
      id: "00001",
      name: "Rahul",
      address: "089 Kutch Green Apt. 448",
      date: "04 Sep 2019",
      status: "Delivered",
    },
    {
      id: "00002",
      name: "Rosie Pearson",
      address: "979 Immanuel Ferry Suite 526",
      date: "28 May 2019",
      status: "Processing",
    },
    {
      id: "00003",
      name: "Darrell Caldwell",
      address: "8587 Frida Ports",
      date: "23 Nov 2019",
      status: "Rejected",
    },
  ];

  const logout = async() => {
   await user_logout()
   dispatch(auth_False())
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
        lg:relative lg:transform-none
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="p-4 flex justify-between items-center">
          <img src="/adminSidelogo.png" alt="" className="xl:w-52 w-40" />
          <h1></h1>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          {/* dashboard */}
          <SidebarItem
            icon={<LayoutGrid size={20} />}
            text="Dashboard"
            onClick={() => navigate("/admin/dashboard")}
            active={select === "/admin/dashboard" ? true : false}
          />
          {/* Products */}
          <SidebarItem
            icon={<Package size={20} />}
            text="Products"
            onClick={() => navigate("/admin/product")}
            active={select === "/admin/product" ? true : false}
          />
          {/* Orders */}
          <SidebarItem
            icon={<ShoppingCart size={20} />}
            text="Orders"
            onClick={() => navigate("/admin/orders")}
            active={select === "/admin/orders" ? true : false}
          />
          {/* customers */}
          <SidebarItem
            icon={<Users size={20} />}
            text="Customers"
            onClick={() => navigate("/admin/customers")}
            active={select === "/admin/customers" ? true : false}
          />
          {/* offers */}
          <SidebarItem
            icon={<Gift size={20} />}
            text="Offers"
            onClick={() => navigate("/admin/offers")}
            active={select === "/admin/offers" ? true : false}
          />
          {/* Reviews  */}
          <SidebarItem
            icon={<Star size={20} />}
            text="Reviews"
            onClick={() => navigate("/admin/reviews")}
            active={select === "/admin/reviews" ? true : false}
          />
          {/* Notification */}
          <SidebarItem
            icon={<Bell size={20} />}
            text="Notification"
            onClick={() => navigate("/admin/notification")}
            active={select === "/admin/notification" ? true : false}
          />
          {/* Contact Us */}
          <SidebarItem
            icon={<MessageCircle size={20} />}
            text="Contact Us"
            onClick={() => navigate("/admin/contact-us")}
            active={select === "/admin/contact-us" ? true : false}
          />

          <div className="my-4 border-t" />
          {/* Coupon */}
          <SidebarItem
            icon={<Ticket size={20} />}
            text="Coupon"
            onClick={() => navigate("/admin/coupon")}
            active={select === "Coupon" ? true : false}
          />
          {/* Banner managment */}
          <SidebarItem
            icon={<ImagePlus size={20} />}
            text="Banner management"
            onClick={() => navigate("/admin/banner-management")}
            active={select === "/admin/banner-management" ? true : false}
          />
          {/* Category */}
          <SidebarItem
            icon={<FolderTree size={20} />}
            text="Category"
            onClick={() => navigate("/admin/category")}
            active={select === "/admin/category" ? true : false}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <header className="bg-white p-4 shadow-sm">
          <div className="flex  items-center justify-between lg:justify-end gap-4">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>

            <button className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2" onClick={logout} >
              <LogOut size={20} />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </header>

        {/* child Component  */}

        <Outlet />
      </div>
    </div>
  );
};




export default AdminLayout;
