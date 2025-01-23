import { useState } from "react";
import { Search, Filter, MoreVertical, Users, FolderTree } from "lucide-react";
import QuickStatCard from "../../HelperComponents/QuickCard";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Switch,
} from "@mui/material";
import { AddCircleOutline, Category } from "@mui/icons-material";

const CategorySection = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [ch, setch] = useState(true);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const customers = [
    {
      id: 1,
      name: "Dark Chocolate",
      email: "sarah.w@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      totalOrders: 28,
      totalSpent: 2890,
      lastOrder: "2024-01-15",
      status: "Disabled",
    },
    {
      id: 2,
      name: "Milk Chocolate",
      email: "michael.c@example.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, USA",
      totalOrders: 15,
      totalSpent: 1750,
      lastOrder: "2024-01-10",
      status: "Active",
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStatCard
          title="Total Category"
          value="1,234"
          icon={<FolderTree />}
        />
      </div>

      {/* Main Category List Card */}
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-start gap-4">
            <h2 className="text-lg font-semibold">Category</h2>
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

            <button className="px-4 py-2 border rounded-lg bg-white flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors">
              <AddCircleOutline />
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  no.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                  Category name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                  disable
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                  Status
                </th>
                <th className="px-6 py-3 relative">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  {/* numbrer */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">1</div>
                  </td>
                  {/* Category Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.name}
                      </div>
                    </div>
                  </td>
                  {/* disable button  */}
                  <td className="pl-4">
                    <Switch
                      color="error"
                      checked={ch}
                      onChange={() => setch(!ch)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : customer.status === "Disabled"
                          ? "bg-red-200 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.status}
                    </span>
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
                      <MenuItem onClick={handleClose}>Delete</MenuItem>
                      <MenuItem onClick={handleClose}>Edit</MenuItem>
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
        <Pagination count={10} />
      </div>
    </div>
  );
};

export default CategorySection;
