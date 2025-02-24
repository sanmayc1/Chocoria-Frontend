import { useEffect, useState } from "react";
import OrderItems from "./OrderItems/OrderItems.jsx";
import { Pagination } from "@mui/material";
import { get_orders } from "../../../../Services/api/orders.js";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs.jsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetch_orders() {
      const response = await get_orders();
      if (response.status === 200) {
        setOrders(response.data.orders);
        return;
      }
    }
    fetch_orders();
  }, []);

  return (
    <>
    
      <div className="w-full  flex flex-col gap-4">
        <div className="bg-white rounded-2xl border hover:shadow-md cursor-pointer transition-shadow duration-300  border-gray-200">
          {orders.length > 0 ? (
            orders.map((order) => {
              return order.items.map((item) => {
                return <OrderItems key={item._id} item={item}  />;
              });
            })
          ) : (
            <p className="text-center py-10">No orders found</p>
          )}
        </div>
        <div className="w-full flex justify-center">
          {orders.length > 0 && <Pagination />}
        </div>
      </div>
    </>
  );
};

export default Orders;
