import  { useState } from "react";
import QuickStatCard from "./QuickCard.jsx";
import { AddCircleOutline } from "@mui/icons-material";
import {
  Search,
  Archive,
  Tag,
  Package,
  MoreVertical,
  Eye,
} from "lucide-react";
import {
    Button,
    IconButton,
    Menu,
    MenuItem,
    Pagination,
    Switch,
  } from "@mui/material";





const ProductSection = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const products = [
    {
      id: 1,
      name: "Ferrero",
      category: "Milk Chocolate",
      price: 599.0,
      stock: 45,
      image: "/placeholder.svg",
      deleted: false,
    },
    {
      id: 2,
      name: "Willgoten",
      category: "Dark Chocolate",
      price: 513.0,
      stock: 50,
      image: "/placeholder.svg",
      deleted: false,
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStatCard
          icon={<Package className="text-blue-500" />}
          title="Total Products"
          value="486"
        />
        <QuickStatCard
          icon={<Archive className="text-green-500" />}
          title="In Stock"
          value="385"
        />
        <QuickStatCard
          icon={<Tag className="text-yellow-500" />}
          title="Categories"
          value="12"
        />
        <QuickStatCard
          icon={<Package className="text-red-500" />}
          title="Low Stock"
          value="15"
        />
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-start gap-4">
            <h2 className="text-lg font-semibold">Products</h2>
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
              <button className="px-4 py-2 border rounded-lg bg-white flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors">
                <AddCircleOutline />
                <span>Add Product</span>
              </button>
              <select
                className="px-4 py-2 border rounded-lg bg-white"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Product</option>
                <option value="active">In Stock</option>
                <option value="inactive">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Product name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Variant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Disable
                </th>
                <th className="px-6 py-3 relative">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  {/* Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src="/Product.png"
                      alt=""
                      className="w-12 h-12 object-scale-down rounded"
                    />
                  </td>

                  {/* Product Name */}
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="text-sm text-gray-900">Milkchocolate</div>
                  </td>
                  {/* Price */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">&#8377; 344</div>
                  </td>
                  {/* Stock */}
                  <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="text-sm text-gray-900 ">
                      <span className="pl-2">34</span>
                    </div>
                  </td>
                  {/* Varient */}
                  <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="text-sm hover:bg-gray-200 w-1/6 ml-4">
                      <Eye size={18}  />
                    </div>
                  </td>
                  {/* Disable */}
                  <td className="pl-4">
                    <Switch
                      color="error"
                      //   checked={true}
                      //   onChange={handleChange}
                      //   inputProps={{ "aria-label": "controlled" }}
                    />
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
                      <MenuItem onClick={handleClose}>Edit</MenuItem>
                      <MenuItem onClick={handleClose}>Delete</MenuItem>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center w-full">
        <Pagination count={10} />
      </div>
    </div>
  );
};

export default ProductSection;
