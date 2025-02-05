import { Heart, Star } from "lucide-react";
import ProductQuantity from "../ProductQuantity/ProductQuantity.jsx";
import Varients from "../Varients/Varients.jsx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { add_to_cart } from "../../../Services/api/cartApi.js";
import { useEffect, useState } from "react";

const ProductDetails = ({
  brand,
  productName,
  price,
  stock,
  varients,
  setSelectedVariant,
  selectedVariant,
  id,
}) => {
  const auth = useSelector((state) => state.auth.auth);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant]);

  const navigate = useNavigate();

  // add to cart
  const addToCart = async () => {
    if (!auth) {
      navigate("/login");

      return;
    }

    const data = { productId: id, quantity, variant: selectedVariant };

    const response = await add_to_cart(data);
    if (response.status === 200) {
      if (response.data.message === "Go to Cart") {
        navigate("/user/cart");
        return;
      }
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    toast.error(response.response.data.message, {
      position: "top-center",
    });
  };
  const buyNow = () => {
    if (!auth) {
      alert("Please Login First");
      navigate("/login");
      return;
    }
    alert("Buy Now");
  };
  return (
    <div className="sm:mx-0 mx-5 flex flex-col w-[100%] ">
      {/* Brand Name */}

      <div className="flex items-center justify-between">
        <h1 className="xl:text-3xl md:text-xl md:font-bold font-semibold">
          {brand}{" "}
        </h1>
        <Heart />
      </div>
      {/* Product Name */}

      <h2 className="xl:text-xl md:py-3 py-2 xl:py-5 ">{productName}</h2>
      {/* Rating */}

      <div className="bg-gray-300 md:w-16 md:h-7 xl:w-16 xl:h-8 h-5 w-10 flex justify-center items-center xl:gap-2 gap-1">
        <p className="font-bold text-xs xl:text-base">4.5</p>
        <Star className="xl:w-4 w-3" />
      </div>
      {/* Price */}

      <h1 className="font-bold xl:text-3xl text-2xl pt-5 xl:pt-7 flex gap-2 items-center">
        ₹{price}{" "}
        <motion.div
          className="w-32   rounded-xl flex items-center justify-center text-white text-xl font-bold"
          initial={{ x: -70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-gray-700 line-through font-normal text-xl ">
            ₹600
          </span>
          <span className="font-normal text-base text-orange-700">
            (10% OFF)
          </span>
        </motion.div>
      </h1>
      <p className=" font-semibold pt-1 text-sm">inclusive of all taxes</p>
      {/* quantity and varient container */}
      <div className="flex gap-4 xl:pt-5">
        {/* Varients */}

        <Varients
          varients={varients}
          setSelectedVariant={setSelectedVariant}
          selectedVariant={selectedVariant}
        />

        {/* Quantitty */}
        <ProductQuantity
          selectedVariant={selectedVariant}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      {stock > 0 ? (
        <p className=" font-semibold pt-5 text-sm text-green-700">{`${stock} In stock`}</p>
      ) : (
        <p className=" font-semibold pt-5 text-sm text-red-700">{`Out of stock`}</p>
      )}
      {/* Cart and buynow */}
      <div className="pt-9 lg:pt-3 xl:pt-5 grid lg:grid-flow-col gap-3 w-full ">
        <button
          className="bg-orange-950 md:h-12  xl:h-14 xl:text-lg h-14  text-white font-semibold rounded-3xl hover:bg-orange-900  transition-colors"
          onClick={addToCart}
        >
          Add to cart
        </button>
        <button
          className="bg-orange-950 md:h-12 xl:h-14 xl:text-lg h-14  text-white font-semibold rounded-3xl hover:bg-orange-900  transition-colors"
          onClick={buyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
