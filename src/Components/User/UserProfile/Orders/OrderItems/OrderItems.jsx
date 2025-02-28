import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../../../Services/api/constants.js";

const OrderItems = ({ item }) => {

    const navigate = useNavigate();

    const navigateToOrderDetailedpage = (itemId)=>{
        navigate(`/user/order/${itemId}`)
    }
  
  return (
    <div className="flex py-6 sm:py-0 sm:flex-row h-auto sm:h-[150px] sm:justify-between px-3 sm:px-5 border-b   border-gray-200 items-center space-y-4 sm:space-y-0 group relative"
     onClick={() => navigateToOrderDetailedpage(item._id)}
    >
      <div className="flex items-center gap-4 w-full sm:w-2/4">
        <img
          src={`${baseUrl}${item.productId?.images[0] ||item.img}`}
          className="w-24 h-24 object-contain"
          alt={ "Product img"}
        />
        <div className="flex-grow text-center sm:text-start">
          <h1 className="font-medium text-sm sm:text-base">
            {item.productId?.name ||
              item.name}
          </h1>
          <p className="text-sm font-normal">Weight :{item.variant.weight}g</p>
          <p className="font-bold sm:hidden block  w-full sm:w-auto  sm:flex-col ">
            <span>₹{item.totalPrice}</span>
          </p>
        </div>
      </div>

      <p className="font-bold sm:block hidden  w-full sm:w-auto  sm:flex-col ">
        <span>₹{item.totalAmountAfterDiscount}</span>
      </p>
      <p
        className={`${
          item.status === "Delivered"
            ? "text-green-500"
            : item.status === "Cancelled"
            ? "text-red-500"
            : "text-orange-400"
        } text-xs hidden sm:block`}
      >
        {item.status}
      </p>
    </div>
  );
};

export default OrderItems;
