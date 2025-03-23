import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar/ProgressBar.jsx";
import { getAllAddressOfUser } from "../../../Services/api/userApi.js";
import Modal from "../../HelperComponents/Modal.jsx";
import AddAddress from "../UserProfile/ManageAddress/AddAddress.jsx";
import SelectAddress from "./SelectAddress/SelectAddress.jsx";
import OrderSummary from "./OrderSummary/OrderSummary.jsx";
import { getCart } from "../../../Services/api/cartApi.js";
import PaymentOptions from "./PaymentOptions/PaymentOptions.jsx";
import { toast } from "react-toastify";
import {
  placeOrder,
  updateOrderStatus,
  verifyPayment,
} from "../../../Services/api/orders.js";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [index, setIndex] = useState(1);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("razorpay");
  const [update, setUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCart() {
      const response = await getCart();
      if (response.status === 200) {
        const data = response.data.cart.products.filter(
          (item) => item.productId !== null
        );

        setCart(data);
        return;
      }
      toast.error(response.response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
    }
    fetchCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      const message =
        "The page that you're looking for used information that you entered. Returning to that page might cause any action you took to be repeated. Do you want to continue?";
      event.returnValue = message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    async function fetchAddress() {
      const response = await getAllAddressOfUser();
      if (response.status === 200 && response.data.addresses.length > 0) {
        setSavedAddresses(response.data.addresses);
        setSelectedAddress(response.data.addresses.find((addres)=>addres.default));
        return null;
      }
    }
    fetchAddress();
  }, [update]);

  const continueToReview = () => {
    if (!selectedAddress) {
      return toast.error("Please select a shipping address", {
        position: "top-center",
        autoClose: 1000,
      });
    }
    setIndex(2);
    window.scrollTo(0, 0);
  };
  const continueToPayment = () => {
    setIndex(3);
    window.scrollTo(0, 0);
  };

  // place order

  const placeOrder = async () => {
    setLoading(true);
    const data = {
      shippingAddress: selectedAddress,
      paymentMethod: selectedMethod,
      items: cart,
      coupon: appliedCoupon,
      couponDiscount: couponDiscount,
    };
    if (selectedMethod === "razorpay") {
      const response = await placeOrder(data);
  
      if (response.status === 200) {
        const order = response.data.razorpayOrder;
        const user = response.data.user;
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
            const res = await verifyPayment(data);
            if (res.status === 200) {
              const id = res.data.order._id;
              navigate(`/user/checkout/success/${id}`);
            }
          },
          prefill: {
            name: selectedAddress.name,
            email: user.email,
            contact: selectedAddress.phone,
          },
          notes: {
            address: selectedAddress.detailed_address,
          },
          theme: {
            color: "#080808",
          },
          modal: {
            ondismiss: async function () {
              
              try {
                const data = {
                  razorpayOrderId: order.id,
                };
                const res = await updateOrderStatus(data);
                
                if (res.status === 200) {
                  navigate(`/checkout/failed/${res.data.order._id}`);
                  return;
                }
              } catch (error) {
                console.log(error);
              }
            },
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", async function (response) {
          try {
            const data = {
              razorpayOrderId: response.error.metadata.order_id,
            };
            const res = await updateOrderStatus(data);

            if (res.status === 200) {
              navigate(`/checkout/failed/${res.data.order._id}`);
             
              return;
            }
          } catch (error) {
            console.log(error);
          }
        });

        setLoading(false);
        return;
      }

      toast.error(response.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
        style: { width: "100%" },
      });
      setLoading(false);
      console.log(response);
      if (response.status === 409) {
        navigate("/user/cart");
      }
      return;
    }

    if (selectedMethod === "COD") {
      const response = await placeOrder(data);
      if (response.status === 200) {
        const id = response.data.order._id;
        setLoading(false);
        return navigate(`/user/checkout/success/${id}`);
      }
      toast.error(response.response.data.message, {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        style: { width: "100%" },
      });
      setLoading(false);

      if (response.status === 409) {
        navigate("/user/cart");
      }
      return;
    }
  };

  return (
    <>
      <div className="min-h-screen  p-4">
        <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-md border p-4 sm:p-6 lg:p-8">
          <ProgressBar index={index} setIndex={setIndex} />
          {index === 1 && (
            <SelectAddress
              selectedAddress={selectedAddress}
              savedAddresses={savedAddresses}
              setSelectedAddress={setSelectedAddress}
              setIsOpen={setIsOpen}
              continueToReview={continueToReview}
            />
          )}
          {index === 2 && (
            <OrderSummary
              total={total}
              setTotal={setTotal}
              appliedCoupon={appliedCoupon}
              setAppliedCoupon={setAppliedCoupon}
              selectedAddress={selectedAddress}
              cart={cart}
              continueToPayment={continueToPayment}
              couponDiscount={couponDiscount}
              setCouponDiscount={setCouponDiscount}
            />
          )}
          {index === 3 && (
            <PaymentOptions
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
              placeOrder={placeOrder}
              loading={loading}
              totalPrice={total}
            />
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        children={
          <AddAddress
            update={update}
            setUpdate={setUpdate}
            closeModel={() => setIsOpen(false)}
          />
        }
      />
    </>
  );
};

export default Checkout;
