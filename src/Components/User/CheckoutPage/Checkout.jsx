import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar/ProgressBar.jsx";
import { get_all_address } from "../../../Services/api/userApi.js";
import Modal from "../../HelperComponents/InputFiled/Modal.jsx";
import AddAddress from "../UserProfile/ManageAddress/AddAddress.jsx";
import SelectAddress from "./SelectAddress/SelectAddress.jsx";
import OrderSummary from "./OrderSummary/OrderSummary.jsx";
import { get_cart } from "../../../Services/api/cartApi.js";
import PaymentOptions from "./PaymentOptions/PaymentOptions.jsx";
import { toast } from "react-toastify";
import { place_order } from "../../../Services/api/orders.js";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [index, setIndex] = useState(1);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("COD");
  const [update, setUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCart() {
      const response = await get_cart();
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
      const response = await get_all_address();
      if (response.status === 200 && response.data.addresses.length > 0) {
        setSavedAddresses(response.data.addresses);
        setSelectedAddress(response.data.addresses[0]);
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
    if (selectedMethod === "googlepay") {
      toast.error("Payment not available now", {
        position: "top-center",
        autoClose: 1000,
      });

      return;
    }
    setLoading(true);
    if (selectedMethod === "COD") {
      const data = {
        shippingAddress: selectedAddress,
        paymentMethod: selectedMethod,
        items: cart,
      };
      const response = await place_order(data);
      if (response.status === 200) {
        const id = response.data.order._id;
        setLoading(false);
        return navigate(`/user/checkout/success/${id}`);
      }
      toast.error(response.response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      setLoading(false);
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
              selectedAddress={selectedAddress}
              cart={cart}
              continueToPayment={continueToPayment}
            />
          )}
          {index === 3 && (
            <PaymentOptions
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
              placeOrder={placeOrder}
              loading={loading}
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
