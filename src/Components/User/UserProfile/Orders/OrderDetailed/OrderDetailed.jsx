import { useEffect, useState } from "react";
import { get_order_details } from "../../../../../Services/api/orders";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../../../Services/api/constants";
import { Button, CircularProgress } from "@mui/material";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";

const OrderDetailed = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    async function fetch_order() {
      const response = await get_order_details(id);
      if (response.status === 200) {
        setOrderItems(response.data.orderItem);
        setOrder(response.data.order);
        response.data.orderItem.status === "Pending" && setIndex(1);
        response.data.orderItem.status === "Shipped" && setIndex(2);
        response.data.orderItem.status === "Delivered" && setIndex(3);
        response.data.orderItem.status === "Cancelled" && setIndex(4);
        return;
      }
    }
    fetch_order();
  }, [id]);

  if (!order && !orderItems)
    return (
      <div className="w-full  flex justify-center items-center h-full">
        <CircularProgress color="inherit" />
      </div>
    );
  return (
    <>
      <div className="w-full  flex flex-col gap-4">
        <div className="bg-white rounded-2xl border hover:shadow-md transition-shadow duration-300  border-gray-200">
          <div className="flex items-center gap-4 w-full ">
            <img
              src={`${baseUrl}${orderItems.productId?.images[0] || orderItems.img}`}
              className="w-40 h-40 object-contain"
              alt={"Product"}
            />
            <div className="flex-grow text-center sm:text-start">
              <h1 className="font-medium text-sm sm:text-base">
                {orderItems.productId?.name || orderItems.name}
              </h1>
              <p className="text-sm font-normal">
                Weight : {orderItems.variant.weight}g
              </p>
              <p className="text-sm font-normal">
                Brand : {orderItems.productId?.brand || orderItems.brand}
              </p>
              <p className="text-sm font-normal">Qty : {orderItems.quantity}</p>
              <p className="font-bold  xl:hidden block   sm:w-auto  sm:flex-col ">
                <span>₹{orderItems.totalPrice}</span>
              </p>
            </div>
            <p className="font-bold  hidden xl:block   text-end px-10 ">
              <span>₹{orderItems.totalPrice}</span>
            </p>
          </div>
          <div className="w-full   ">
            <OrderProgressBar index={index} />
          </div>

          <div className="p-4 px-7 flex justify-between items-center ">
            <div>
              <h1 className="font-medium text-sm sm:text-lg pb-1 w-full ">
                Order Details
              </h1>
              <p className="text-xs sm:text-sm pb-5 font-medium ">
                Order ID : {order._id}
              </p>
              <p className="text-xs sm:text-sm pb-2 font-medium ">
                Delivery Address
              </p>

              <div className="w-full">
                <p className="text-sm font-medium">
                  {order.shippingAddress.name}
                </p>
                <p className="text-sm">
                  {order.shippingAddress.detailed_address}
                </p>
                <p className="text-sm">{`${order.shippingAddress.city} ${order.shippingAddress.state} ${order.shippingAddress.pincode} `}</p>
                <p className="text-sm">{order.shippingAddress.landmark}</p>
                <p className="text-sm">{`Phone : ${order.shippingAddress.phone}`}</p>
              </div>
            </div>
            {/* payment details */}
            <div className=" ">
              <p className="text-xs sm:text-sm pb-2 font-medium ">
                Payment Details
              </p>

              <div className="w-full ">
                <p className="text-sm font-medium">
                  Payment Method : {order.paymentMethod}
                </p>
                <p className="text-sm font-medium ">
                  Toatl Amount : ₹{orderItems.totalPrice}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 px-7 flex justify-end ">
            <Button variant="outlined" color="error">
              Cancel Order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailed;
