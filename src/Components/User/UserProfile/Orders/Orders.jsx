import { useEffect, useState } from "react";
import OrderItems from "./OrderItems/OrderItems.jsx";
import { CircularProgress, Pagination } from "@mui/material";
import { getOrders } from "../../../../Services/api/orders.js";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const response = await getOrders();
      if (response.status === 200) {
        const data = response.data.orders
        setTotalPages(Math.ceil(data.length / ordersPerPage));
        const startIndex = (currentPage - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;
        const currentOrders = data.slice(startIndex, endIndex);
        setOrders(currentOrders);
        setLoading(false);
        return;
      }
    }
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchOrders();
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

   if (loading) {
      return (
        <div className="h-full w-full flex justify-center items-center">
          <CircularProgress color="inherit" size={30} />
        </div>
      );
    }

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
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange}  />
        </div>
      </div>
    </>
  );
};

export default Orders;
