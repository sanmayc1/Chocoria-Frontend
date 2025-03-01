import { useEffect, useState } from "react";
import {
  Search,
  RefreshCwIcon,
  Layers,
  ChartNoAxesCombined,
  HandCoins,
  BadgePercent,
  ChartColumnIncreasing,
} from "lucide-react";
import QuickStatCard from "../HelperComponents/QuickCard.jsx";
import { Pagination } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getDeliveredOrders } from "../../../Services/api/orders.js";

const OrderSection = () => {
  const [update, setUpdate] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllOrders(){
        const response = await getDeliveredOrders();

        if(response.status === 200){
            setOrders(response.data.orders);
            return;
        }

    }
    fetchAllOrders();
  },[])

  const totlaDiscount = orders.reduce((acc,order) => acc + order.offerDiscount + order.couponDiscount,0);
  const totalSalesAmount = orders.reduce((acc,order) => acc + order.totalPrice,0);
  const totalRevenue = orders.reduce((acc,order) => acc + order.totalAmountAfterDiscount,0);

  return (
    <>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickStatCard
            title="Total Sales"
            value={orders.length}
            icon={<ChartColumnIncreasing color="green" />}
          />
          <QuickStatCard
            title="Total Sales Amount"
            value={totalSalesAmount}
            icon={<HandCoins color="blue" />}
          />
          <QuickStatCard
            title="Total Discount"
            value={totlaDiscount}
            icon={<BadgePercent color="red" />}
          />
          <QuickStatCard
            title="Total Revenue"
            value={totalRevenue}
            icon={<ChartNoAxesCombined color="green" />}
          />
        </div>

        {/* Main Customer List Card */}
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-start gap-4">
              <h2 className="text-lg font-semibold">Sales Report</h2>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                   Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Product
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                   Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                   Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                   Offer Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                   Coupon Discount
                  </th>
                  <th className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                   Net Amount
                  </th>
                 
                 
                
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 "
                    
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm  text-gray-900">
                        {order.orderId.uniqueOrderId}
                      </div>
                      <div className="text-sm text-gray-500"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">
                        {order.orderId.orderDate.split("T")[0]}
                      </div>
                    </td>

                    <td className="pl-4">
                      <span className="px-2 text-sm">
                        {order.orderId.shippingAddress.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                      >
                        {order.name.length < 22 ? order.name : order.name.slice(0,22) + "..."}
                      </span>
                    </td>
                    <td className="px-10 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm text-gray-900">
                        {order.quantity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                      >
                        ₹{order.totalPrice}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                      >
                        ₹{order.offerDiscount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                      >
                        ₹{order.couponDiscount}
                      </span>
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
          {orders.length > 5 && <Pagination count={1} />}
        </div>
      </div>
    </>
  );
};

export default OrderSection;
