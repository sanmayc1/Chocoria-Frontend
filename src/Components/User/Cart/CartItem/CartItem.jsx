import { baseUrl } from "../../../../Services/api/constants.js";

const CartItem = ({ quantity, handleQuantityChange, id, product,variant,navigateToProductDetailedPage }) => {
  return (
    <div className="flex flex-col sm:flex-row h-auto sm:h-[150px] sm:justify-between px-3 sm:px-5 border-b   border-gray-200 items-center space-y-4 sm:space-y-0">
      <div className="flex items-center gap-4 w-full sm:w-2/4" onClick={() => navigateToProductDetailedPage(id)}>
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
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto sm:justify-center gap-4 border border-black rounded-2xl px-2 py-1">
        <button
          className="text-xl font-bold w-8 text-center"
          onClick={() => handleQuantityChange("decrement", id,variant.id)}
        >
          -
        </button>
        <span className="mx-2">{quantity}</span>
        <button
          className="text-xl font-bold w-8 text-center"
          onClick={() => handleQuantityChange("increment", id,variant.id)}
        >
          +
        </button>
      </div>

      <p className="font-bold  w-full sm:w-auto sm:ml-2 flex sm:flex-col justify-between text-end">
        <span className="sm:hidden text-sm  text-black">Price</span>
        <span>${variant.price * quantity}</span>
      </p>
      <div></div>
    </div>
  );
};

export default CartItem;
