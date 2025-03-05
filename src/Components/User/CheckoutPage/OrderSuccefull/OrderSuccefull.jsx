import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserOrderDetails } from "../../../../Services/api/orders.js";
import { CircularProgress } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { baseUrl } from "../../../../Services/api/constants";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };

    return () => {
      window.onpopstate = null;
    };
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await getUserOrderDetails(id);
        if (res.status === 200) {
          setOrderDetails(res.data.order);
          return;
        }
      } catch (error) {
        console.error("Error fetching order details", error);
      }
    };

    fetchOrderDetails();
  }, []);

  if (!orderDetails) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <CircularProgress color="inherit" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10 flex justify-center">
      <div className="bg-white rounded-2xl  shadow-sm p-20 max-w- w-full lg:w-5/6  ">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-4 ">
          <span>
            <VerifiedIcon
              fontSize="large"
              color="success"
              className="animate-pulse scale-125 "
            />
          </span>
          Order Placed Successfully
        </h1>

        <div className="flex justify-between w-full">
          <div className="py-20 space-y-2 w-1/2">
            <h3 className="text-lg ">
              Order ID:{" "}
              <span className="font-bold">{orderDetails.uniqueOrderId}</span>
            </h3>
            <h3 className="text-lg ">
              Shipping Address:{" "}
              <span className="font-semibold">
                {orderDetails.shippingAddress.name}
              </span>
            </h3>
            <h3 className="text-lg ">
              Phone Number:{" "}
              <span className="font-semibold">
                {orderDetails.shippingAddress.phone}
              </span>
            </h3>
            <h3 className="text-lg ">
              Address:{" "}
              <span className="font-semibold">
                {orderDetails.shippingAddress.detailed_address}
              </span>
            </h3>
            <h3 className="text-lg">
              Order Date:{" "}
              <span className="font-semibold">
                {orderDetails.orderDate.split("T")[0]}
              </span>
            </h3>
          </div>
          {/* payment sections */}
          <div className="py-20 space-y-3 w-1/4">
            <h3 className="text-lg flex font-semibold justify-between ">
              Payment Method
              <span className="font-bold">{orderDetails.paymentMethod}</span>
            </h3>
            <h3 className="text-lg flex justify-between ">
              Subtotal
              <span className="font-bold">
                {orderDetails.totalAmount.toFixed(2)}
              </span>
            </h3>
            <h3 className="flex justify-between">
              Discount
              <span className="font-bold">
                {orderDetails.offerDiscount.toFixed(2)}
              </span>
            </h3>
            <h3 className="flex justify-between">
              Coupon
              <span className="font-bold">
                {orderDetails.couponDiscount.toFixed(2)}
              </span>
            </h3>
            <h3 className="text-lg font-semibold flex justify-between ">
              Total Amount
              <span className="font-bold">
                {orderDetails.totalAmountAfterDiscount.toFixed(2)}
              </span>
            </h3>
          </div>
        </div>

        {/* order items  */}

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold ">Order Items</h3>

          <div className="space-y-2 border border-gray-300 p-4 rounded-2xl ">
            {orderDetails.items?.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between  w-full border-b"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={`${baseUrl}${item.productId.images[0]}`}
                    alt={item.product_name}
                    className="object-cover w-24 h-24"
                  />
                  <h3 className="font-semibold">
                    {item.productId.name}
                  </h3>
                </div>

                <p className=" font-semibold">Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-lg flex items-center justify-center gap-2 pt-7">
          Thank You For Shopping With Us{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </span>
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
