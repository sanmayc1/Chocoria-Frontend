import { ShieldAlert } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderFailed = () => {

  const navigate = useNavigate();

  useEffect(() => {
  
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
    };
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      window.onpopstate = null;
    };
    
  }, []);

  const handleBackToOrders = () => {
    navigate("/user/order");
  };
  return (
    <div className="h-screen p-10 py-32 flex justify-center   ">
      <div className="w-full sm:w-1/2 lg:w-1/3   bg-white h-fit p-10 rounded-2xl">
        <span className="flex items-center justify-center">
          <ShieldAlert size={45} color="red" className="animate-pulse" />
        </span>
        <h1 className="text-2xl font-semibold text-center "> Payment Failed</h1>
        <p className="text-center mt-2">
          Your payment failed. Please try again.You can go back to orders page
          and continue your payment.
        </p>
        <div className="flex items-center justify-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleBackToOrders}
          >
            Back to Orders Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFailed;
