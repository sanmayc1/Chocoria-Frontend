import { useEffect, useState } from "react";
import {
  cancelOrder,
  createRazorpayOrder,
  getOrderDetails,
  getCancelRequest,
  getReturnRequest,
  orderReturn,
  retryPaymentVerify,
} from "../../../../../Services/api/orders";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../../../Services/api/constants";
import { Button, CircularProgress } from "@mui/material";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import DeleteDailog from "../../../../HelperComponents/DeleteDailog.jsx";
import Modal from "../../../../HelperComponents/Modal.jsx";
import OrderCancelRequest from "./OrderCancelRequest";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import OrderReturnRequest from "./OrderReturnRequest.jsx";
import CancelReturnReason from "./CancelReturnReason.jsx";
import ReviewRatingModal from "./ReviewRatingModal.jsx";

const OrderDetailed = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [index, setIndex] = useState(0);
  const [isOpenCancelConfirmation, setIsOpenCancelConfirmation] =
    useState(false);
  const [isOpenReturnRequest, setIsOpenReturnRequest] = useState(false);
  const [isOpenReturnRequestConfirmation, setIsOpenReturnRequestConfirmation] =
    useState(false);
  const [isOpenCancelRequest, setIsOpenCancelRequest] = useState(false);
  const [update, setUpdate] = useState(false);
  const [cancelRequest, setCancelRequest] = useState(null);
  const [returnRequest, setReturnRequest] = useState(null);
  const [isOpenReview, setIsOpenReview] = useState(false);
  const [review, setReview] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchOrder() {
      const response = await getOrderDetails(id);
      if (response.status === 200) {
        setOrderItems(response.data.orderItem);
        setOrder(response.data.order);
        setReview(response.data.review);
        response.data.orderItem.status === "Pending" && setIndex(1);
        response.data.orderItem.status === "Shipped" && setIndex(2);
        response.data.orderItem.status === "Delivered" && setIndex(3);
        response.data.orderItem.status === "Cancelled" && setIndex(4);
        response.data.orderItem.status === "Order Not Placed" && setIndex(5);
        response.data.orderItem.status === "Return" && setIndex(6);

        return;
      }
    }
    fetchOrder();
  }, [id, update]);

  useEffect(() => {
    const fetchCancelRequest = async () => {
      const response = await getCancelRequest(id);
      const responseReturnRequest = await getReturnRequest(id);
      if (response.status === 200 && responseReturnRequest.status === 200) {
        setCancelRequest(response.data.cancelRequest);
        setReturnRequest(responseReturnRequest.data.returnRequest);
        return;
      }
    };
    fetchCancelRequest();
  }, [update]);

  const confirmCancel = () => {
    setIsOpenCancelConfirmation(false);
    setIsOpenCancelRequest(true);
  };

  const confrimReturn = () => {
    setIsOpenReturnRequestConfirmation(false);
    setIsOpenReturnRequest(true);
  };

  const continuePayment = async () => {
    const response = await createRazorpayOrder({
      totalAmountAfterDiscount: orderItems.totalAmountAfterDiscount,
      orderItemId: orderItems._id,
    });

    if (response.status === 200) {
      const order = response.data.order;
      console.log(order);
      const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Chocoria",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          const data = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: order.id,
            razorpaySignature: response.razorpay_signature,
          };
          const res = await retryPaymentVerify(data);
          if (res.status === 200) {
            setUpdate(!update);
            setTimeout(() => {
              toast.success("Payment Successful", {
                position: "top-center",
                autoClose: 1000,
              });
            }, 3000);
          }
        },
        modal: {
          onDismiss: () => {
            navigate("/checkout/failed/" + order._id);
          },
        },

        theme: {
          color: "#080808",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", async function (response) {
        navigate(`/checkout/failed/${res.data.order._id}`);
        return;
      });
      return;
    }

    toast.error(response.response.data.message, {
      position: "top-center",
      theme: "dark",
      style: { width: "100%" },
      autoClose:5000

    });
    return;
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

  const submitReturnRequest = async (reason) => {
    const data = {
      reason: reason.reason,
      explanation: reason.explanation,
      orderItemId: orderItems._id,
    };

    const response = await orderReturn(data);

    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      setUpdate(!update);
      setIsOpenReturnRequest(false);
      return;
    }
    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 1000,
    });
  };

  const downloadInvoice = async () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("INVOICE", 10, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setLineHeightFactor(0.1);
    doc.text(`Order ID: ${order.uniqueOrderId}`, 10, 40);
    doc.text(`Date: ${order.orderDate.split("T")[0]}`, 10, 45);
    doc.text(`Customer: ${order.shippingAddress.name}`, 10, 50);
    doc.text(`Phone: ${order.shippingAddress.phone}`, 10, 55);
    doc.text(`Address: ${order.shippingAddress.detailed_address}`, 10, 60);
    doc.text(`Payment Method: ${order.paymentMethod}`, 10, 65);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setLineHeightFactor(0.1);
    doc.text(`${orderItems.productId?.name}`, 10, 80);
    doc.text(`Quantity :${orderItems.quantity}`, 10, 85);

    doc.text(`Total Price `, 10, 105);
    doc.text(`${orderItems.totalPrice.toFixed(2)}`, 50, 105);
    doc.text(`Discount `, 10, 110);
    doc.text(`${orderItems.offerDiscount.toFixed(2)}`, 50, 110);
    doc.text(`Coupon `, 10, 115);
    doc.text(`${orderItems.couponDiscount.toFixed(2)}`, 50, 115);
    doc.setFont("helvetica", "bold");
    doc.text(`Price`, 10, 125);
    doc.text(`${orderItems.totalAmountAfterDiscount.toFixed(2)}`, 50, 125);

    doc.save(`invoice.pdf`);
  };

  const openReviewModal = () => {
    setIsOpenReview(true);
  };

  const closeReviewModal = () => {
    setIsOpenReview(false);
  };

  if (!order && !orderItems) {
    return (
      <div className="w-full  flex justify-center items-center h-full">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full  flex flex-col gap-4">
        <div className="bg-white rounded-2xl border hover:shadow-md transition-shadow duration-300 border-gray-200">
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
              <p className="text-sm font-normal ">
                Brand :{" "}
                <span className="uppercase">
                  {" "}
                  {orderItems.productId?.brand?.name || orderItems.brand}
                </span>
              </p>
              <p className="text-sm font-normal">Qty : {orderItems.quantity}</p>
              <p className="font-bold  xl:hidden block   sm:w-auto  sm:flex-col ">
                <span>₹{orderItems.totalPrice}</span>
              </p>
            </div>
            <p className="font-bold  hidden xl:block   text-end px-10 ">
              <span>₹{orderItems.totalAmountAfterDiscount}</span>
            </p>
          </div>
          <div className="w-full   ">
            <OrderProgressBar index={index} />
          </div>

          <div className="p-4 px-7 xl:flex-row flex-col flex justify-between xl:items-center gap-5 ">
            <div>
              <h1 className="font-semibold  sm:text-lg pb-1 w-full ">
                Order Details
              </h1>
              <p className="text-xs sm:text-sm pb-5 font-medium ">
                Order ID: {order.uniqueOrderId}
              </p>
              <p className=" sm:text-sm pb-2 font-medium ">Delivery Address</p>

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

              {orderItems.status === "Delivered" && (
                <p
                  className="pt-5 text-blue-500 cursor-pointer"
                  onClick={downloadInvoice}
                >
                  Download Invoice
                </p>
              )}
            </div>
            {/* payment details */}
            <div className="xl:w-1/3">
              <p className="  pb-2 font-semibold ">Payment Details</p>

              <div className="w-full ">
                <p className="text-sm font-medium ">
                  Payment Method : {order.paymentMethod}
                </p>
                <p className="text-sm font-medium pb-4">
                  Payment Status :{" "}
                  <span
                    className={`font-medium uppercase ${
                      orderItems.paymentStatus === "success"
                        ? "text-green-500"
                        : orderItems.paymentStatus === "failed"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {orderItems.paymentStatus}
                  </span>
                </p>

                <div className="flex justify-between font-medium">
                  <span>Selling Price </span>
                  <span>₹{orderItems.totalPrice}</span>
                </div>
                <div className=" flex justify-between font-medium">
                  <span>Shipping </span>
                  <span>₹{"0.00"}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Discount </span>
                  <span>-₹{orderItems.offerDiscount || "0.00"}</span>
                </div>
                <div className=" flex justify-between font-medium">
                  <span>Coupon </span>
                  <span>-₹{orderItems.couponDiscount.toFixed(2)}</span>
                </div>
                <div className="font-medium flex justify-between pt-5 ">
                  <span>Toatl Amount </span>
                  <span className="text-lg font-bold">
                    ₹{orderItems.totalAmountAfterDiscount}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {cancelRequest === null ? (
            returnRequest === null ? (
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
                  <div className="flex gap-4">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setIsOpenReturnRequestConfirmation(true)}
                    >
                      Return
                    </Button>
                    {!review && (
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={openReviewModal}
                      >
                        Rate & Review
                      </Button>
                    )}
                  </div>
                ) : orderItems.status === "Cancelled" ? (
                  <p className="text-sm font-medium">Order Cancelled</p>
                ) : orderItems.status === "Order Not Placed" ? (
                  <div className="flex flex-col gap-2 w-full">
                    <p className="text-md font-medium ">Order Not Placed</p>

                    <p className="text-sm">
                      Your Payment was not confirmed by the bank.
                    </p>
                    <div className="flex justify-end">
                      {new Date().toISOString().split("T")[0] ==
                        order.orderDate.split("T")[0] && (
                        <Button
                          onClick={continuePayment}
                          variant="contained"
                          color="success"
                        >
                          Continue Payment
                        </Button>
                      )}
                    </div>
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
              <div className="flex justify-between items-end pe-2 pb-2">
                <CancelReturnReason
                  reason={returnRequest}
                  title={"Return Request"}
                />
                {returnRequest.status !== "approved" && !review ? (
                  <Button
                    variant="outlined"
                    color="inherit"
                    className="h-10"
                    onClick={openReviewModal}
                  >
                    Rate & Review
                  </Button>
                ) : null}
              </div>
            )
          ) : (
            <CancelReturnReason
              reason={cancelRequest}
              title={"Cancel Request"}
            />
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
      <Modal
        isOpen={isOpenReturnRequestConfirmation}
        onClose={() => setIsOpenReturnRequestConfirmation(false)}
      >
        <DeleteDailog
          btnName={"Yes"}
          rejectBtnName={"No"}
          title={"Return Order"}
          cancel={() => setIsOpenReturnRequestConfirmation(false)}
          message={"Are you sure you want to Return this order?"}
          confirm={confrimReturn}
        />
      </Modal>
      <Modal
        isOpen={isOpenReturnRequest}
        onClose={() => setIsOpenReturnRequest(false)}
      >
        <OrderReturnRequest
          cancel={() => setIsOpenReturnRequest(false)}
          confirm={submitReturnRequest}
        />
      </Modal>
      <Modal isOpen={isOpenReview} onClose={closeReviewModal}>
        <ReviewRatingModal
          onClose={closeReviewModal}
          userId={order.userId}
          productId={orderItems.productId._id}
          orderItemId={orderItems._id}
          setUpdate={setUpdate}
        />
      </Modal>
    </>
  );
};

export default OrderDetailed;
