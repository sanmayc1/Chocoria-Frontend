import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import CartItem from "./CartItem/CartItem.jsx";
import { get_cart } from "../../../Services/api/cartApi.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
 
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const handleQuantityChange = (action, id,variant_id) => {
    if (action === "increment") {

     const newCart =  cart.map((item)=>{
        if(item.productId._id === id && item.variant.id === variant_id){
          if(item.quantity < item.variant.quantity ){
            return {...item, quantity: item.quantity + 1}
          }else{
            toast.error("Quantity is already at its maximum", {
              position: "top-center",
              autoClose: 1000,
            });
          }
        }
        return item;
      })
      setCart(newCart)
      
    } else if (action === "decrement" ) {
      setCart((prev)=> prev.map((item)=>{
        if(item.productId._id === id && item.variant.id === variant_id){
          if(item.quantity > 1){
            return {...item, quantity: item.quantity -1 }
          }
          
        }
        return item;
      }))
    }
  };

  // deleted product
  const deletedProduct = (id) => {
    toast.error("Product not available", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  // navigate to product detailed page
  const navigateToProductDetailedPage = (id) => {
    navigate(`/product/${id}`);
  };
  
  useEffect(() => {
    async function fetchCart() {
      const response = await get_cart();
      if (response.status === 200) {
        
        setCart(response.data.cart.products);
      }
    }
    fetchCart();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen  p-4">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-md border  p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-5 ml-2">
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Column - Cart Items */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-200">
              {cart && cart.length > 0 ? (
                cart.map((item) => {
                  if (!item.productId.is_deleted) {
                    return (
                      <CartItem
                        key={item._id}
                        quantity={item.quantity}
                        product={item.productId}
                        handleQuantityChange={handleQuantityChange}
                        navigateToProductDetailedPage={navigateToProductDetailedPage}
                        id={item.productId._id}
                        variant={item.variant}
                      />
                    );
                  }else{
                    return(
                      <CartItem
                      key={item._id}
                      quantity={0}
                      product={item.productId}
                      handleQuantityChange={deletedProduct}
                      id={item._id}
                      navigateToProductDetailedPage={deletedProduct}
                      variant={item.variant}
                    />
                    )
                  }
                })
              ) : (
                <div className="text-center py-10 text-gray-500">
                  Your cart is empty
                </div>
              )}
            </div>

            {/* Place Order Button */}
          </div>

          {/* Right Column - Price Details */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl border border-gray-200 p-4 h-fit">
            <p className="text-lg font-bold ml-2 border-b border-gray-600 border-dashed pb-5">
              Price Details
            </p>
            <div className="p-3 space-y-3">
              {/* Price Details Breakdown */}
              <div className="flex justify-between items-center">
                <p className="text-base font-semibold">Price ( items)</p>
                <p className="text-base font-bold">$2333</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-base font-semibold">Delivery Charge</p>
                <p className="text-base font-bold">$93</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-base font-semibold">Discount</p>
                <p className="text-base font-bold">-$ 100</p>
              </div>
            </div>

            <div className="flex justify-between items-center px-3 pt-4 border-t border-gray-200">
              <p className="text-base font-bold">Total Amount</p>
              <p className="text-base font-bold">$2999</p>
            </div>

            <div className="bg-white rounded-2xl pt-4 flex justify-end">
              <Button
                variant="contained"
                className="!bg-[#7C2D12] !text-white flex items-center group justify-center "
                size="large"
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
