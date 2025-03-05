import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuickStatCard from "../HelperComponents/QuickCard.jsx";
import { ChevronRight } from "lucide-react";

import RevenueChart from "./RevenueChart.jsx";
import { useEffect, useState } from "react";
import { getTopSellingProduct } from "../../../Services/api/productApi.js";
import { getTopSellingCategories } from "../../../Services/api/category.js";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("daily");
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [topSellingCategories, setTopSellingCategories] = useState([]);
  const [topSellingBrands, setTopSellingBrands] = useState([]);

  useEffect(() => {
    async function fetchTopSellingProducts() {
      try {
        const productResponse = await getTopSellingProduct();
        const categoryResponse = await getTopSellingCategories();

        if (productResponse.status === 200 && categoryResponse.status === 200) {
          setTopSellingProducts(productResponse.data.products);
          setTopSellingCategories(categoryResponse.data.categories);
          return;
        }
        toast.error("Failed to fetch data");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
    fetchTopSellingProducts();
  }, []);

  const navigateToSalesReport = () => {
    navigate("/admin/sales-report");
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <QuickStatCard
          title="View"
          value={"Sales Report "}
          icon={
            <ChevronRight
              className="bg-blue-400 rounded-full p-1 cursor-pointer"
              onClick={navigateToSalesReport}
            />
          }
        />
      </div>

      {/* Main content container */}
      <div className="bg-white rounded-lg shadow min-h-screen p-3 sm:p-5 md:p-10 space-y-4 sm:space-y-5">
        <h1 className="font-bold text-xl sm:text-2xl p-2 sm:p-3">
          Order Revenue Chart
        </h1>

        {/* Filter selector - repositioned for mobile */}
        <div className="flex justify-end px-2 sm:px-5">
          <label
            htmlFor="filter"
            className="w-full sm:w-48 font-semibold flex flex-col gap-2"
          >
            Filter By
            <select
              id="filter"
              name="filter"
              className="border w-full font-normal p-2 rounded"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>
        </div>

        {/* Chart with responsive container */}
        <div className="w-full overflow-x-auto pb-5 sm:pb-10">
          <div className="min-w-[300px]">
            <RevenueChart selectedFilter={selectedFilter} />
          </div>
        </div>

        {/* Top selling products */}
        <div className="pb-3 sm:pb-5 overflow-x-auto">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl p-2 sm:p-3 mb-2 sm:mb-5 text-gray-700">
            Top Selling Products
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full shadow-sm border min-w-[300px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topSellingProducts.length > 0 ? (
                  topSellingProducts.map((product) => (
                    <tr key={product._id}>
                      <td className="px-3 sm:px-6 py-2 sm:py-3">
                        {product.name}
                      </td>
                      <td className="px-3 sm:px-10 py-2 sm:py-3 text-right">
                        {product.buyCount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-3 sm:px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top selling categories */}
        <div className="pb-3 sm:pb-5 overflow-x-auto">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl p-2 sm:p-3 mb-2 sm:mb-5 text-gray-700">
            Top Selling Categories
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full border shadow-sm min-w-[300px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topSellingCategories.length > 0 ? (
                  topSellingCategories.map((category) => (
                    <tr key={category._id}>
                      <td className="px-3 sm:px-6 py-2 sm:py-3">
                        {category.name}
                      </td>
                      <td className="px-3 sm:px-10 py-2 sm:py-3 text-right">
                        {category.buyCount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-3 sm:px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No categories available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top selling Brands */}
        <div className="pb-3 sm:pb-5 overflow-x-auto">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl p-2 sm:p-3 mb-2 sm:mb-5 text-gray-700">
            Top Selling Brands
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full shadow-sm border min-w-[300px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topSellingBrands.length > 0 ? (
                  topSellingBrands.map((brand) => (
                    <tr key={brand._id}>
                      <td className="px-3 sm:px-6 py-2 sm:py-3">
                        {brand.name}
                      </td>
                      <td className="px-3 sm:px-10 py-2 sm:py-3 text-right">
                        {brand.buyCount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-3 sm:px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No brands available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
