import { Heart, Star } from "lucide-react";
import ProductQuantity from "../ProductQuantity/ProductQuantity.jsx";
import Varients from "../Varients/Varients.jsx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { addToCart } from "../../../Services/api/cartApi.js";
import { useEffect, useState } from "react";
import {
  addOrRemoveFromWhishlist,
  checkIfItemIsInWishlist,
} from "../../../Services/api/whishlistApi.js";

const ProductDetails = ({
  brand,
  productName,
  price,
  stock,
  varients,
  setSelectedVariant,
  selectedVariant,
  id,
  actualPrice,
  offer,
  rating
}) => {
  const auth = useSelector((state) => state.auth.auth);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant]);

  useEffect(() => {
    const checkItemInWishlist = async () => {
      const response = await checkIfItemIsInWishlist(id, selectedVariant?._id);
      if (response.status === 200) {
        setIsWishlist(response.data.exists);
        return;
      }
      setIsWishlist(false);
    };
    if (auth) {
      checkItemInWishlist();
    }
  }, [selectedVariant, update]);

  const navigate = useNavigate();

  // add to cart
  const handleAddToCart = async () => {
    if (!auth) {
      navigate("/login");

      return;
    }
    if (selectedVariant.quantity === 0) {
      toast.error("Product is out of stock", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
      return;
    }

    const data = { productId: id, quantity, variant: selectedVariant };

    const response = await addToCart(data);
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
      autoClose: 1600,
      style: { width: "100%" },
      theme: "dark",
    });
  };
  const buyNow = () => {
    if (!auth) {
      toast.error("Please Login First", {
        position: "top-center",
      });
      navigate("/login");
      return;
    }
    if (selectedVariant.quantity === 0) {
      toast.error("Product is out of stock", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
      return;
    }

    navigate(
      `/user/checkout/${id}/${selectedVariant._id}?quantity=${quantity}`
    );
  };

  // add or remove from whishlist
  const handleWishlist = async () => {
    if (!auth) {
      toast.error("Please Login First", {
        position: "top-center",
      });
      navigate("/login");
      return;
    }
    const data = { productId: id, variant: selectedVariant._id };
    const response = await addOrRemoveFromWhishlist(data);
    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
        style: { width: "100%" },
        theme: "dark",
      });
      setUpdate(!update);
      return;
    }
    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 1000,
      style: { width: "100%" },
      theme: "dark",
    });
  };
  return (
    <div className="sm:mx-0 mx-5 flex flex-col w-[100%] ">
      {/* Brand Name */}

      <div className="flex items-center justify-between">
        <h1 className="xl:text-3xl md:text-xl md:font-bold font-semibold">
          {brand.charAt(0).toUpperCase() + brand.slice(1)}
        </h1>
        <Heart
          onClick={handleWishlist}
          fill={`${isWishlist ? "red" : "none"}`}
          color={`${isWishlist ? "red" : "black"}`}
        />
      </div>
      {/* Product Name */}

      <h2 className="xl:text-xl md:py-3 py-2 xl:py-5 ">{productName}</h2>
      {/* Rating */}

      {rating > 0 && <div className="bg-gray-300 md:w-16 md:h-7 xl:w-16 xl:h-8 h-5 w-10 flex justify-center items-center xl:gap-2 gap-1">
        <p className="font-bold text-xs xl:text-base">{rating}</p>
        <Star className="xl:w-4 w-3" />
      </div>}
      {/* Price */}

      <h1 className="font-bold xl:text-3xl text-2xl pt-5 xl:pt-7 flex gap-2 items-center">
        ₹{price}{" "}
        <motion.div
          className="w-32   rounded-xl flex items-center justify-center text-white text-xl font-bold"
          initial={{ x: -70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {actualPrice && (
            <span>
              {" "}
              <span className="text-gray-700 line-through font-normal text-xl ">
                ₹{actualPrice}
              </span>
              <span className="font-normal text-base text-orange-700">
                ({offer?.percentage}% OFF)
              </span>
            </span>
          )}
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
      {stock > 5 ? (
        <p className=" font-semibold pt-5 text-sm text-green-700">{`In stock`}</p>
      ) : (
        <p className=" font-semibold pt-5 text-sm text-red-700">{`${
          stock == 0 ? "Out of stock" : `Only ${stock} left`
        }`}</p>
      )}
      {/* Cart and buynow */}
      <div className="pt-9 lg:pt-3 xl:pt-5 grid lg:grid-flow-col gap-3 w-full ">
        <button
          className="bg-orange-950 md:h-12  xl:h-14 xl:text-lg h-14  text-white font-semibold rounded-3xl hover:bg-orange-900  transition-colors"
          onClick={handleAddToCart}
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
