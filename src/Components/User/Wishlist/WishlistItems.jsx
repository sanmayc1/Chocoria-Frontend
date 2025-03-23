import DeleteDailog from "../../HelperComponents/DeleteDailog.jsx";
import { Trash2 } from "lucide-react";
import { baseUrl } from "../../../Services/api/constants.js";
import { useState } from "react";
import Modal from "../../HelperComponents/Modal.jsx";
import { toast } from "react-toastify";
import { removeWishlistItem } from "../../../Services/api/whishlistApi.js";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../Services/api/cartApi.js";

const WishlistItems = ({ product, setUpdateWishlist, updateWishlist }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const modalOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };
  const modalClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleRemoveFromWishlist = async () => {
    const response = await removeWishlistItem(product._id);
    if (response.status === 200) {
      setUpdateWishlist(!updateWishlist);
      modalClose();
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }

    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
    });
    modalClose();
    return;
  };

  const addToCart = async () => {
    if (!product.variant.quantity) {
      toast.error("Product is out of stock", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
      return;
    }
    const data = {
      productId: product.productId._id,
      quantity: 1,
      variant: product.variant,
    };
    const response = await addToCart(data);
    if (response.status === 200) {
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
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row h-auto sm:h-[150px] sm:justify-between p-3 sm:px-5 border-b   border-gray-200 items-center space-y-4 sm:space-y-0 group relative">
        <Trash2
          size={18}
          className="text-red-600  cursor-pointer absolute top-4  right-2   opacity-0 group-hover:opacity-100 transition-opacity duration-300 "
          onClick={modalOpen}
        />
        <div
          className="flex items-center gap-4 w-full sm:w-2/4"
          onClick={() =>
            navigate(
              `/product/${product?.productId?._id}?variant=${product?.variant?._id}`
            )
          }
        >
          <img
            src={`${baseUrl}${product?.productId?.images[0]}`}
            className="w-24 h-24 object-contain"
            alt={product?.productId?.name || "Product"}
          />
          <div className="flex-grow">
            <h1 className="font-medium text-sm sm:text-base">
              {product?.productId?.name || "Product name"}
            </h1>
            <p className="text-sm font-normal">
              Weight : {product?.variant?.weight} g
            </p>
          </div>
        </div>
        {product?.variant?.quantity === 0 && (
          <p className="text-sm font-medium text-red-500">Out of stock</p>
        )}
        <p className="font-bold  w-full sm:w-auto sm:ml-2 flex sm:flex-col justify-between text-center">
          <span className="sm:hidden text-sm  text-black">Price</span>
          <span>₹{product?.variant?.price}</span>
        </p>
        <button
          className="bg-orange-800 text-white px-4 py-2 rounded"
          onClick={addToCart}
        >
          Add to cart
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={modalClose}
        children={
          <DeleteDailog
            message={"Are you sure you want to remove this item?"}
            title={"Remove from wishlist ?"}
            cancel={modalClose}
            confirm={handleRemoveFromWishlist}
          />
        }
      />
    </>
  );
};

export default WishlistItems;
