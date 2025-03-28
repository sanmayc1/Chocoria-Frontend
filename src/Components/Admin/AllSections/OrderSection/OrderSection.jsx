import { useEffect, useState } from "react";
import { Search, RefreshCwIcon, Layers } from "lucide-react";
import QuickStatCard from "../../HelperComponents/QuickCard";
import { Pagination } from "@mui/material";
import { toast } from "react-toastify";
import { getAllOrdersAdminSide } from "../../../../Services/api/orders.js";
import { useNavigate } from "react-router-dom";

const OrderSection = () => {
  const [update, setUpdate] = useState(false);
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  const [orderCancelRequests, setOrderCancelRequests] = useState(0);
  const [OrderReturnRequest,setOrderReturnRequests] = useState(0)
  const [searchTerm, setSearchTerm] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllOrder() {
      const response = await getAllOrdersAdminSide();
      if (response.status === 200) {
        setData(response.data.orders);
        setOrderCancelRequests(response.data.orderCancelRequests);
        setOrderReturnRequests(response.data.returnRequests)
        return;
      }
      toast.error(response.response.data.message);
    }
    fetchAllOrder();
  }, [update]);

  useEffect(() => {
    const results = data.filter((order) =>
      order.uniqueOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPageCount(Math.ceil(results.length / 6));
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    setOrders(results.slice(startIndex, endIndex));
  }, [searchTerm, data, currentPage]);

  const handlePageChange = (e,value) => {
    setCurrentPage(value);
  
  }

  return (
    <>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickStatCard
            title="Total Orders"
            value={data.length}
            icon={<Layers />}
          />
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <div className="pr-2 relative  ">
                <button
                  className=" px-4 py-2 border rounded-lg bg-white flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => navigate("/admin/orders/return")}
                >
                  Order Return Requests{" "}
                  {OrderReturnRequest > 0 && (
                    <span className="bg-red-500 h-5 w-5 rounded-full absolute top-0 right-0 flex justify-center items-center text-white text-xs font-semibold">
                      {OrderReturnRequest}
                    </span>
                  )}
                </button>
              </div>
              <div className="pr-2 relative  ">
                <button
                  className=" px-4 py-2 border rounded-lg bg-white flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => navigate("/admin/orders/cancel")}
                >
                  Order Cancel Requests{" "}
                  {orderCancelRequests > 0 && (
                    <span className="bg-red-500 h-5 w-5 rounded-full absolute top-0 right-0 flex justify-center items-center text-white text-xs font-semibold">
                      {orderCancelRequests}
                    </span>
                  )}
                </button>
              </div>
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
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/admin/order/${order._id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm  text-gray-900">
                        {order.uniqueOrderId}
                      </div>
                      <div className="text-sm text-gray-500"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">
                        {order.shippingAddress.name}
                      </div>
                    </td>

                    <td className="pl-4">
                      <span className="px-2 text-sm">
                        {order.paymentMethod}
                      </span>
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
                        {order.orderDate.split("T")[0]}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                      >
                        ₹{order.totalAmountAfterDiscount}
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
          <Pagination count={pageCount} page={currentPage} onChange={handlePageChange}  />
        </div>
      </div>
    </>
  );
};

export default OrderSection;
