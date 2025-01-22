import React, { useEffect, useState } from 'react';
import { LayoutGrid, Package, ShoppingCart, Users, Gift, Cookie, Bell, MessageCircle, 
         Ticket, ImagePlus, FolderTree, ChevronUp, ChevronDown, Search, LogOut, Menu, X, Star } from 'lucide-react';
import SidebarItem from '../HelperComponents/SidebarItems.jsx';
import ProductSection from '../ProductSection/ProductSection.jsx';
import CustomerSection from '../CustomerSection/CoustomerSection.jsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation()
  const [select,setSelect] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    
    setSelect(location.pathname)
  },[location.pathname])
  
  console.log(location.pathname)
  // Dummy data
  const stats = {
    totalUsers: 40689,
    totalOrders: 10293,
    totalSales: 89000,
    userGrowth: 8.5,
    orderGrowth: 1.3,
    salesGrowth: -4.3
  };

  const orders = [
    { id: '00001', name: 'Rahul', address: '089 Kutch Green Apt. 448', date: '04 Sep 2019', status: 'Delivered' },
    { id: '00002', name: 'Rosie Pearson', address: '979 Immanuel Ferry Suite 526', date: '28 May 2019', status: 'Processing' },
    { id: '00003', name: 'Darrell Caldwell', address: '8587 Frida Ports', date: '23 Nov 2019', status: 'Rejected' }
  ];

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
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
        lg:relative lg:transform-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Chocoria</h1>
          <button 
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          <SidebarItem icon={<LayoutGrid size={20} />} text="Dashboard" onClick={()=>navigate("/admin/dashboard")} active={select === "/admin/dashboard" ? true:false} />
          <SidebarItem icon={<Package size={20} />} text="Products" onClick={()=>navigate("/admin/product")} active={select === "/admin/product" ?true:false} />
          <SidebarItem icon={<ShoppingCart size={20} />} text="Orders" onClick={()=>setSelect("Orders")} active={select === "Orders" ?true:false} />
          <SidebarItem icon={<Users size={20} />} text="Customers" onClick={()=>navigate("/admin/customers")} active={select === "/admin/customers" ?true:false}/>
          <SidebarItem icon={<Gift size={20} />} text="Offers" onClick={()=>setSelect("Offers")} active={select === "Offers" ?true:false} />
          <SidebarItem icon={<Star size={20} />} text="Reviews" onClick={()=>setSelect("Reviews")} active={select === "Reviews" ?true:false} />
          <SidebarItem icon={<Bell size={20} />} text="Notification" onClick={()=>setSelect("Notification")} active={select === "Notification" ?true:false} />
          <SidebarItem icon={<MessageCircle size={20} />} text="Contact Us" onClick={()=>setSelect("Contact Us")} active={select === "Contact Us" ?true:false} />
          <div className="my-4 border-t" />
          <SidebarItem icon={<Ticket size={20} />} text="Coupon" onClick={()=>setSelect("Coupon")} active={select === "Coupon" ?true:false} />
          <SidebarItem icon={<ImagePlus size={20} />} text="Banner management" onClick={()=>setSelect("Banner management")} active={select === "Banner management" ?true:false} />
          <SidebarItem icon={<FolderTree size={20} />} text="Category" onClick={()=>setSelect("Category")} active={select === "Category" ?true:false}/>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-scroll overflow-x-hidden">
        {/* Header */}
        <header className="bg-white p-4 shadow-sm">
          <div className="flex  items-center justify-between sm:justify-end gap-4">
            <button 
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            
            
            <button className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2">
              <LogOut size={20} />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </header>

       {/* child Component  */}

        <Outlet/>
        

      </div>
    </div>
  );
};




const StatCard = ({ title, value, change, icon }) => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
        <p className="text-xl sm:text-2xl font-semibold">{value}</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-lg">
        {icon}
      </div>
    </div>
    <div className="flex items-center gap-1">
      {change >= 0 ? (
        <ChevronUp className="text-green-500" size={16} />
      ) : (
        <ChevronDown className="text-red-500" size={16} />
      )}
      <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {Math.abs(change)}% {change >= 0 ? 'Up' : 'Down'} from last month
      </span>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

export default AdminLayout;