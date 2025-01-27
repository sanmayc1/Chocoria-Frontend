import { useEffect, useState } from "react";
import { Search, Filter, MoreVertical, Users, RefreshCwIcon } from "lucide-react";
import QuickStatCard from "../../HelperComponents/QuickCard";
import { IconButton, Menu, MenuItem, Pagination, Switch } from "@mui/material";
import { block_user, delete_user, fetch_users } from "../../../../Services/api/adminApi.js";
import { toast } from "react-toastify";

const CustomerSection = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [update, setUpdate] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch_users()
      .then((res) => {
        setCustomers(res.data.users);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  }, [update]);

  //  handle block
  const handleBlock = async(e,id) => {
    
   const response =  await block_user(id);

    if(response.status === 200){
      setUpdate(!update)
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
    }else{
      toast.error(response.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }

  };

  // delete the user
  const deleteUser = async(id) => {
    setAnchorEl(null);
   const response =  await delete_user(id)
   if(response.status === 200){
    setUpdate(!update)
    toast.success(response.data.message, {
      position: "top-center",
      autoClose: 1000,
    });
  }else{
    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 2000,
    });
  }

    
  };
  // setCustomers(customers)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStatCard title="Total Customers" value={customers.length} icon={<Users />} />
        <QuickStatCard title="Active Customers" value={customers.filter((customer)=>customer.is_Blocked !== true).length} />
        {/* <QuickStatCard title="New This Month" value="1" /> */}
      </div>

      {/* Main Customer List Card */}
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-start gap-4">
            <h2 className="text-lg font-semibold">Customers</h2>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="px-4 py-2 border rounded-lg bg-white flex items-center justify-center gap-2 ">
                <Filter size={16} />
                <span>Filter</span>
              </div>
              <select
                className="px-4 py-2 border rounded-lg bg-white"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Customers</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="px-4 py-2 border rounded-lg bg-white flex items-center justify-center gap-2 cursor-pointer" onClick={()=>setUpdate(!update)}>
                <RefreshCwIcon size={16} />
                
              </div>
           
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Block
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Last Login
                </th>
                <th className="px-6 py-3 relative">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {customer.username.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.username}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm text-gray-900">
                      {customer.phone}
                    </div>
                  </td>

                  <td className="pl-4">
                    <Switch
                      color="error"
                      checked={customer.is_Blocked}
                      onChange={(e)=>handleBlock(e, customer._id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.is_Blocked === false
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.is_Blocked === false ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="text-sm text-gray-900">
                      {customer.last_login ? customer.last_login : "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <MoreVertical size={20} />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={()=>deleteUser(customer._id)}>Delete</MenuItem>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center">
        {customers.length > 5 && <Pagination count={Math.max(customers.length/5)} />}
      </div>
    </div>
  );
};

export default CustomerSection;
