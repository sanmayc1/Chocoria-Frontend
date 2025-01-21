import { useState } from "react";

const ProductQuantity = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  return (
    <>
      <div>
        <p className="font-medium py-4 ">SELECT QUANTITY</p>
        <div className="flex items-center gap-4 ">
          {/* Decrease Button */}
          <button
            onClick={handleDecrease}
            className="w-10 h-10 bg-gray-200 rounded-lg flex justify-center items-center text-lg font-semibold text-gray-700 hover:bg-gray-300"
          >
            -
          </button>

          {/* Quantity Display */}
          <span className="text-xl font-medium text-gray-800">{quantity}</span>

          {/* Increase Button */}
          <button
            onClick={handleIncrease}
            className="w-10 h-10 bg-gray-200 rounded-lg flex justify-center items-center text-lg font-semibold text-gray-700 hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductQuantity;
