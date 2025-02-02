import { useState } from "react";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action) => {
    if (action === "increment") {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-auto rounded-3xl shadow-md border border-black p-4 md:p-8 lg:p-6">
        <h1 className="text-3xl font-bold mb-5 ml-2">Shoping Cart</h1>
        <div className="flex justify-between items-start gap-4">
          <div className="w-2/3 flex flex-col gap-2">
            {/* product card */}
            <div className="bg-white h-[350px] rounded-2xl  mt-34">
              <div className="h-[150px] px-5 border-b border-black flex justify-between items-center">
                <div className="flex items-center gap-2 w-2/4">
                  <img
                    src="/Product.png"
                    className=" h-24 object-contain "
                    alt=""
                  />
                  <h1 className="">
                    product details lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quos, quae
                  </h1>
                </div>

                <div className="flex items-center gap-4 border border-black  rounded-2xl px-2 ">
                  <button className=" text-xl font-bold" onClick={() => handleQuantityChange("decrement")}>-</button>

                  <span>{quantity}</span>
                  <button className=" font-bold" onClick={() => handleQuantityChange("increment")}>+</button>
                </div>

                <p className="ml-2 font-bold">$2333</p>
              </div>
            </div>
            {/* subtotal price  */}
            <div className="bg-white h-[50px] rounded-2xl  mt-34 flex items-center justify-end px-4">
              <h1 className="text-base font-bold ml-2">
                Subtotal (2 items): $2333
              </h1>
            </div>
          </div>
          {/* total price and and checkout button */}
          <div className="bg-white h-[250px] rounded-2xl w-1/3 mt-34">sad</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
