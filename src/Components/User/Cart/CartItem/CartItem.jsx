import { toast } from "react-toastify";
import {
  delete_cart_item,
  update_quantity,
} from "../../../../Services/api/cartApi.js";
import { baseUrl } from "../../../../Services/api/constants.js";
import { Trash2 } from "lucide-react";
import DeleteDailog from "../../../HelperComponents/DeleteDailog.jsx";
import Modal from "../../../HelperComponents/Modal.jsx";
import { useState } from "react";

const CartItem = ({
  quantity,
  id,
  product,
  variant,
  navigateToProductDetailedPage,
  update,
  setUpdate,
  cart,
  deleted,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // close modal

  const modalClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };
  const modalOpen = (id, variant_id) => {
    setSelectedProduct({ id, variant_id });
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  // quandity change
  const handleQuantityChange = async (action, id, variant_id) => {
    if (deleted) {
      toast.error("Product not available", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
    setLoading(true);
    const product = cart.find(
      (item) => item.productId._id === id && item.variant._id === variant_id
    );

    let quantity = product.quantity;
    if (quantity === 1 && action === "decrement") {
      modalOpen(product.productId._id, product.variant._id);
      return;
    }
    if (action === "increment") {
      quantity++;
    }
    if (action === "decrement") {
      quantity--;
    }

    const response = await update_quantity({
      productId: product.productId._id,
      quantity,
      variantId: product.variant._id,
    });
    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      setUpdate(!update);
      setLoading(false);
      return;
    }
    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 2000,
      style: { width: "100%" },
      theme: "dark",
    });
    setLoading(false);
  };

  // delete product
  const handleDelete = async () => {
    const { id, variant_id } = selectedProduct;
    const response = await delete_cart_item(id, variant_id);
    if (response.status === 200) {
      modalClose();
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });

      setUpdate(!update);

      return;
    }
    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row h-auto sm:h-[150px] sm:justify-between px-3 sm:px-5 border-b   border-gray-200 items-center space-y-4 sm:space-y-0 group relative">
        <Trash2
          size={18}
          className="text-red-600  cursor-pointer absolute top-4  right-2   opacity-0 group-hover:opacity-100 transition-opacity duration-300 "
          onClick={() => modalOpen(id, variant._id)}
        />
        <div
          className="flex items-center gap-4 w-full sm:w-2/4"
          onClick={() => navigateToProductDetailedPage(id, variant._id)}
        >
          <img
            src={`${baseUrl}${product?.images[0]}`}
            className="w-24 h-24 object-contain"
            alt={product?.name || "Product"}
          />
          <div className="flex-grow">
            <h1 className="font-medium text-sm sm:text-base">
              {product?.name || "Product details lorem ipsum dolor sit amet"}
            </h1>
            <p className="text-sm font-normal">Weight : {variant?.weight}g</p>
            <p className="text-sm font-medium flex items-baseline gap-2">
              Price :{" "}
              {variant.actualPrice && (
                <span className="text-xs font-normal line-through">
                  ₹{variant.actualPrice}
                </span>
              )}
              <span className="text-base font-medium">{variant?.price}</span>
              {variant.actualPrice && (
                <span className="text-xs font-medium text-green-700">
                  {product.offer.percentage}% Off
                </span>
              )}
            </p>
          </div>
        </div>

        {quantity > 0 ?<div className="flex items-center justify-between w-full sm:w-auto sm:justify-center gap-4 border border-black rounded-2xl px-2 py-1">
          <button
            disabled={loading}
            className="text-xl font-bold w-8 text-center"
            onClick={() => handleQuantityChange("decrement", id, variant._id)}
          >
            {quantity === 1 ? <Trash2 size={15} /> : "-"}
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            disabled={loading}
            className="text-xl font-bold w-8 text-center"
            onClick={() => handleQuantityChange("increment", id, variant._id)}
          >
            +
          </button>
        </div>: <div className="text-red-500 font-bold">Out of Stock</div>}

        <p className="font-bold  w-full sm:w-auto sm:ml-2 flex sm:flex-col justify-between text-center">
          <span className="sm:hidden text-sm  text-black">Price</span>

          <span> ₹{variant.price * quantity}</span>
        </p>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={modalClose}
        children={
          <DeleteDailog
            message={"Are you sure you want to remove this item?"}
            title={"Delete Item"}
            cancel={modalClose}
            confirm={handleDelete}
          />
        }
      />
    </>
  );
};

export default CartItem;
