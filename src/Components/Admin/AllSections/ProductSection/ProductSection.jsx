import { useEffect, useState } from "react";
import QuickStatCard from "../../HelperComponents/QuickCard.jsx";
import { AddCircleOutline } from "@mui/icons-material";
import { Search, Package, MoreVertical } from "lucide-react";
import { CircularProgress, IconButton, Menu, MenuItem, Pagination, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  getAllProductsAdminSide,
  disableProduct,
} from "../../../../Services/api/productApi.js";
import { toast } from "react-toastify";
import { baseUrl } from "../../../../Services/api/constants.js";
const ProductSection = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading,setLoading] = useState(false)
  

  useEffect(() => {
    async function fetchAllProducts() {
      setLoading(true)
      const response = await getAllProductsAdminSide();
      if (response.status === 200) {
        setData(response.data.products);
        setLoading(false)
        return;
      }
      setLoading(false)
      toast.error(response.response.data.message);
    }
    fetchAllProducts();
  }, [update]);

  useEffect(() => {
    const results = data.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalPages(Math.ceil(results.length / 4));

    const startIndex = (currentPage - 1) * 4;
    const endIndex = startIndex + 4;
    setProducts(results.slice(startIndex, endIndex));
  }, [searchTerm, data, currentPage]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const handleChange = async (e, id) => {
    const response = await disableProduct({ id });

    if (response.status === 200) {
      setUpdate(!update);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
    } else {
      toast.error(response.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleMenu = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const stock = (variants) => {
    return variants.reduce((acc, cur) => {
      return (acc = +cur.quantity);
    }, 0);
  };
  // edit product
  const editProduct = () => {
    setAnchorEl(null);
    navigate(`/admin/product/edit-product/${selectedProduct._id}`);
  };

  const deleteProductData = async () => {
    setAnchorEl(null);
    const response = await deleteProduct(selectedProduct._id);

    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      setUpdate(!update);

      return null;
    }

    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
      style: { width: "100%" },
    });
  };

   if (loading) {
      return (
        <div className="h-screen w-full flex justify-center items-center">
          <CircularProgress color="inherit" size={40} />
        </div>
      );
    }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStatCard
          icon={<Package className="text-blue-500" />}
          title="Total Products"
          value={data.length}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Products"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                className="px-4 py-2 border rounded-lg bg-white flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors"
                onClick={() => navigate("/admin/product/add-product")}
              >
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider table-cell">
                  Product name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider table-cell">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider table-cell">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider table-cell">
                  Disable
                </th>
                <th className="px-6 py-3 relative">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length > 0 ? products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  {/* Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={`${baseUrl}${product.images[0]}`}
                      alt=""
                      className="w-12 h-12 object-scale-down rounded"
                    />
                  </td>

                  {/* Product Name */}
                  <td className="px-6 py-4 whitespace-nowrap table-cell">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap table-cell uppercase">
                    <div className="text-sm text-gray-900">
                      {product.category.name}
                    </div>
                  </td>
                  {/* Price */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      &#8377; {product.variants[0].price}
                    </div>
                  </td>
                  {/* Stock */}
                  <td className="px-6 py-4 whitespace-nowrap table-cell">
                    <div className="text-sm text-gray-900 ">
                      <span className="pl-2">{stock(product.variants)}</span>
                    </div>
                  </td>

                  {/* Disable */}
                  <td className="pl-4">
                    <Switch
                      color="error"
                      checked={product.is_deleted}
                      onChange={(e) => handleChange(e, product._id)}
                    />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={(e) => handleMenu(e, product)}
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
                      <MenuItem onClick={editProduct}>Edit</MenuItem>
                      <MenuItem onClick={deleteProductData}>Delete</MenuItem>
                    </Menu>
                  </td>
                </tr>
              )): <td className="text-lg p-4 text-center w-full" colSpan={6}>No Product Found !</td>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center w-full">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductSection;
