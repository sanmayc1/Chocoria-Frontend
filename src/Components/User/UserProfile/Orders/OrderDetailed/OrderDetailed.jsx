import { useEffect, useState } from "react";
import {
  cancelOrder,
  get_order_details,
  getCancelRequest,
} from "../../../../../Services/api/orders";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../../../Services/api/constants";
import { Button, CircularProgress } from "@mui/material";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import DeleteDailog from "../../../../HelperComponents/InputFiled/DeleteDailog";
import Modal from "../../../../HelperComponents/InputFiled/Modal";
import OrderCancelRequest from "./OrderCancelRequest";
import { toast } from "react-toastify";

const OrderDetailed = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [index, setIndex] = useState(0);
  const [isOpenCancelConfirmation, setIsOpenCancelConfirmation] =
    useState(false);
  const [isOpenCancelRequest, setIsOpenCancelRequest] = useState(false);
  const [update, setUpdate] = useState(false);
  const [cancelRequest, setCancelRequest] = useState(null);

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
        response.data.orderItem.status === "Order Not Placed" && setIndex(5);
        return;
      }
    }
    fetch_order();
  }, [id, update]);

  useEffect(() => {
    const fetchCancelRequest = async () => {
      const response = await getCancelRequest(id);
      if (response.status === 200) {
        setCancelRequest(response.data.cancelRequest);
        return;
      }
    };
    fetchCancelRequest();
  }, [update]);

  const confirmCancel = () => {
    setIsOpenCancelConfirmation(false);
    setIsOpenCancelRequest(true);
  };

  const submitCancelRequest = async (reason) => {
    const data = {
      reason: reason.reason,
      explanation: reason.explanation,
      orderItemId: orderItems._id,
    };

    const response = await cancelOrder(order._id, data);
    if (response.status === 200) {
      setIsOpenCancelRequest(false);
      setUpdate(!update);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 1000,
    });
  };

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
              src={`${baseUrl}${
                orderItems.productId?.images[0] || orderItems.img
              }`}
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

          <div className="p-4 px-7 sm:flex-row flex-col flex justify-between sm:items-center gap-5 ">
            <div>
              <h1 className="font-medium text-sm sm:text-lg pb-1 w-full ">
                Order Details
              </h1>
              <p className="text-xs sm:text-sm pb-5 font-medium ">
                Order ID: {order.uniqueOrderId}
              </p>
              <p className=" sm:text-sm pb-2 font-medium ">
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
            <div>
              <p className=" sm:text-sm pb-2 font-medium ">
                Payment Details
              </p>

              <div className="w-full ">
                <p className="text-sm font-medium">
                  Payment Method : {order.paymentMethod}
                </p>
                <p className="text-sm font-medium">
                  Payment Status : {order.paymentStatus}
                </p>
                <p className="pt-4 font-medium ">
                  Toatl Amount : ₹{orderItems.totalPrice}
                </p>
              </div>
            </div>
          </div>
          {cancelRequest === null ? (
            <div
              className={`p-4 px-7 flex ${
                orderItems.status === "Cancelled"
                  ? "justify-center"
                  : orderItems.status === "Order Not Placed"
                  ? "justify-start"
                  : "justify-end"
              } `}
            >
              {orderItems.status === "Delivered" ? (
                <Button variant="outlined" color="inherit">
                  Rate & Review
                </Button>
              ) : orderItems.status === "Cancelled" ? (
                <p className="text-sm font-medium">Order Cancelled</p>
              ) : orderItems.status === "Order Not Placed" ? (
                <div>
                  <p className="text-md font-medium ">Order Not Placed</p>
                
                  <p className="text-sm">Your Payment was not confirmed by the bank.</p>
                </div>
              ) : (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setIsOpenCancelConfirmation(true)}
                >
                  Cancel Order
                </Button>
              )}
            </div>
          ) : (
            <div className="px-7 p-4">
              <h1 className="font-medium text-sm sm:text-lg pb-1 w-full ">
                Cancel Request
              </h1>
              <p className="text-sm font-medium">
                Reason : {cancelRequest.reason}
              </p>

              <p className="text-sm font-medium ">
                Status :{" "}
                <span
                  className={`font-bold uppercase ${
                    cancelRequest.status === "pending"
                      ? "text-orange-500"
                      : cancelRequest.status === "approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {cancelRequest.status}
                </span>
              </p>

              <p className="text-sm font-medium">
                Details : {cancelRequest.response}
              </p>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpenCancelConfirmation}
        onClose={() => setIsOpenCancelConfirmation(false)}
      >
        <DeleteDailog
          btnName={"Yes"}
          rejectBtnName={"No"}
          title={"Cancel Order"}
          cancel={() => setIsOpenCancelConfirmation(false)}
          message={"Are you sure you want to cancel this order?"}
          confirm={confirmCancel}
        />
      </Modal>
      <Modal
        isOpen={isOpenCancelRequest}
        onClose={() => setIsOpenCancelRequest(false)}
      >
        <OrderCancelRequest
          cancel={() => setIsOpenCancelRequest(false)}
          confirm={submitCancelRequest}
        />
      </Modal>
    </>
  );
};

export default OrderDetailed;
