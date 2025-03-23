import {
  CircleCheckBig,
  CirclePercent,
  Star,
  TicketPercent,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../../Services/api/cartApi";
import { baseUrl } from "../../../Services/api/constants";

const ProductCard = ({
  productTitle,
  rating,
  imageUrl,
  id,
  variants,
  cart,
  setUpdate,
  offer,
}) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.auth);
  const [availableVariant, setAvailableVariant] = useState(null);

  const checkItemInCart = () => {
    if (auth && cart) {
      const existingItem = cart.find((item) => item.productId._id === id);

      if (existingItem) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setAvailableVariant(variants.find((item) => item.quantity !== 0));
  }, [variants]);

  const navigateToProductDetailedPage = () => {
    navigate(
      `/product/${id}?variant=${
        availableVariant ? availableVariant._id : variants[0]._id
      }`
    );
  };

  const addToCard = async () => {
    if (!auth) {
      navigate("/login");
      return;
    } else {
      if (!availableVariant) {
        toast.error("Product is out of stock", {
          position: "top-center",
          autoClose: 1000,
          theme: "dark",
        });
        return;
      }
      const data = { productId: id, quantity: 1, variant: availableVariant };
      const response = await addToCart(data);
      if (response.status === 200) {
        setUpdate((prev) => !prev);
        if (response.data.message === "Go to Cart") {
          return navigate("/user/cart");
        }

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
    }
  };

  return (
    <>
      <div className="shadow-md w-fit rounded-3xl flex flex-col relative hover:scale-105 transform transition-transform duration-300 m-2">
        {/* Price image rating container */}
        {offer  && (
          <div className="absolute top-5 right-0 rounded-l-full flex justify-center items-center bg-orange-900  sm:h-7 text-white sm:text-xs text-[8px] sm:px-2 h-4 px-1">
            {offer?.percentage}% <span className="sm:block hidden">OFF</span> 
          </div>
        )}
        <div
          className="bg-white max-h-40 min-h-[200px] min-w-[150px] max-w-32 md:min-h-[218px] md:max-h-[218px] md:min-w-[200px] md:max-w-[180px] xl:min-h-[250px] xl:max-h-[250px] xl:min-w-[235px] xl:max-w-[235px] rounded-3xl md:rounded-b-none flex flex-col justify-between "
          onClick={navigateToProductDetailedPage}
        >
          {/* Card Image */}

          <div className="w-full overflow-hidden flex justify-center p-4 ">
            <img
              src={`${baseUrl}${imageUrl}`}
              alt=""
              className="object-scale-down xl:max-h-[130px] md:max-h-[120px] max-h-20 xl:min-h-[130px] md:min-h-[120px] min-h-20 "
            />
          </div>

          {/* Product tittle */}

          <p className="px-3 xl:px-6 font-semibold text-xs xl:text-sm break-words">
            {productTitle?.length < 45
              ? productTitle
              : `${productTitle?.slice(0, 45)}....`}
          </p>

          {/* Price and rating container */}

          <div className="flex items-center justify-between pb-1 xl:px-4 md:px-3 px-4">
            {/* Price */}

            {availableVariant ? (
              <h5 className="pt-3 flex items-baseline gap-1 font-bold md:text-2xl xl:text-2xl w-2/5 ">
               {offer &&<span className="line-through text-gray-600 font-medium text-base">₹{availableVariant?.actualPrice}</span>} &#8377;{availableVariant.price} 
              </h5>
            ) : (
              <h5 className="pt-3  font-bold text-xs md:text-base xl:text-lg text-red-600  ">
                Out of Stock
              </h5>
            )}

            {/* Rating */}

           {rating > 0 && <div className="w-2/5 pt-2 px-3">
              <div className="bg-gray-300 md:w-16 md:h-7 xl:w-14 xl:h-6 h-5 w-10 flex justify-center items-center xl:gap-2 gap-1">
                <p className="font-bold text-xs">{rating}</p>
                <Star className="xl:w-4 w-3"  />
              </div>
            </div>}
          </div>
        </div>
        <button
          className="bg-orange-950 md:h-12 w-full xl:h-14 xl:text-lg   text-white font-semibold rounded-b-3xl hidden md:block hover:bg-orange-900  transition-colors duration-500"
          onClick={addToCard}
        >
          {checkItemInCart() ? (
            <span className="flex items-center gap-2 justify-center ">
              <CircleCheckBig size={19} />
              Go to cart
            </span>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </>
  );
};

export default ProductCard;
