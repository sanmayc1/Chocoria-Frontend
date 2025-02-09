import { useEffect, useState } from "react";
import { Search, Filter, RefreshCwIcon, Layers } from "lucide-react";
import QuickStatCard from "../../HelperComponents/QuickCard";
import { Pagination } from "@mui/material";
import { toast } from "react-toastify";
import { get_all_orders } from "../../../../Services/api/orders.js";

const OrderSection = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [update, setUpdate] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetch_All_Orders() {
      const response = await get_all_orders();
      if (response.status === 200) {
        setOrders(response.data.orders);
        return;
      }
      toast.error(response.response.data.message);
    }
    fetch_All_Orders();
  }, [update]);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStatCard title="Total Orders" value={orders.length} icon={<Layers />} />
        {/* <QuickStatCard title="New This Month" value="1" /> */}
      </div>

      {/* Main Customer List Card */}
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-start gap-4">
            <h2 className="text-lg font-semibold">Orders</h2>
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
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            {/* <div className="flex flex-col sm:flex-row gap-2">
              <div className="px-4 py-2 border rounded-lg bg-white flex items-center justify-center gap-2 ">
                <Filter size={16} />
                <span>Filter</span>
              </div>
              <select
                className="px-4 py-2 border rounded-lg bg-white"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="active">Shipped</option>
                <option value="inactive">Cancelled</option>
              </select>
            </div> */}
            <div
              className="px-4 py-2 border rounded-lg bg-white flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => setUpdate(!update)}
            >
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
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Payment Method
                </th>
               
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm  text-gray-900">{order._id}</div>
                    <div className="text-sm text-gray-500"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm text-gray-900">
                      {order.shippingAddress.name}
                    </div>
                  </td>

                  <td className="pl-4">
                    <span className="px-2 text-sm">{order.paymentMethod}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                    >
                      {order.items.length}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="text-sm text-gray-900">
                      {order.orderDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                    >
                      {order.totalAmount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center">
        {orders.length > 5 && (
          <Pagination count={Math.max(orders.length / 5)} />
        )}
      </div>
    </div>
  );
};

export default OrderSection;
