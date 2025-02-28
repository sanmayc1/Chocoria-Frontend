import React, { useEffect, useState } from "react";
import { Package, MapPin, CreditCard, ChevronRight, Tag } from "lucide-react";
import { baseUrl } from "../../../../Services/api/constants";
import { getUserCoupons } from "../../../../Services/api/coupon";
import { toast } from "react-toastify";

const OrderSummary = ({ selectedAddress, cart, continueToPayment, appliedCoupon, setAppliedCoupon, setCouponDiscount, couponDiscount }) => {
  const [couponCode, setCouponCode] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [isApplying, setIsApplying] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCoupon = async () => {
      const response = await getUserCoupons();

      if (response.status === 200) {
        setCoupons(response.data.coupons);
        setTotal(
          cart.reduce(
            (sum, item) => sum + item.variant.price * item.quantity,
            0
          )
        );
      }
    };
    fetchCoupon();
  }, []);

  const totalPrice = cart.reduce((acc, cur) => {
    
    return (acc += cur.variant.price* cur.quantity);
  }, 0);

  const subtotal = cart.reduce(
    (sum, item) => {
      const price = item.variant.actualPrice ?? item.variant.price;
     return sum + price * item.quantity
    },
    0
  );

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;

    const coupon = coupons.find((coupon) => coupon.code === couponCode);

    if (!coupon) {
      toast.error("Coupon not found", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }

    if (coupon.minPurchaseAmount > total) {
      toast.error("Mnimum purchase amount not met", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        style: { width: "100%" },
      });
      return;
    }

    if (coupon.minPurchaseAmount <= total) {
      let discount = 0;
      if (coupon.type === "percentage") {
        discount = (total * coupon.value) / 100;
      } else {
        discount = coupon.value;
      }

      const maxDiscount = Math.min(discount, coupon.maxDiscountAmount);
      setCouponDiscount(maxDiscount);
      setTotal(total - maxDiscount);

      setAppliedCoupon(coupon);
      setIsApplying(false);
      return;
    }

    setIsApplying(true);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setTotal(totalPrice);
    setCouponDiscount(0);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Order Summary</h1>

      {/* Items Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold">Order Items({cart.length})</h2>
        </div>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex gap-4">
              <img
                src={`${baseUrl}${item.productId.images[0]}`}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.productId.name}</h3>
                <p className="text-sm text-gray-600">
                  Weight: {item.variant.weight}g
                </p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ₹{(item.variant.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold">Shipping Address</h2>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">{selectedAddress?.name}</p>
            <p className="text-gray-600">{selectedAddress?.city}</p>
            {selectedAddress?.detailed_address && (
              <p className="text-gray-600">
                {selectedAddress?.detailed_address}
              </p>
            )}
            <p className="text-gray-600">
              {selectedAddress?.city}, {selectedAddress?.state}{" "}
              {selectedAddress?.pincode}
            </p>
          </div>
        </div>
      </div>

      {/* Coupon Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold">Add Coupon</h2>
        </div>

        {appliedCoupon ? (
          <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
            <div>
              <p className="font-medium text-green-700">{appliedCoupon.code}</p>
              <p className="text-sm text-green-600">
                {appliedCoupon.description}
              </p>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleApplyCoupon}
                disabled={isApplying || !couponCode}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 disabled:bg-blue-300 transition-colors"
              >
                {isApplying ? "Applying..." : "Apply"}
              </button>
            </div>
            <p className="text-sm text-gray-600 py-5 px-2">Available Coupons</p>
            <div className="border border-gray-200 flex gap-2 flex-col p-4  rounded-lg">
              {coupons.length > 0 ? (
                coupons.map((coupon) => {
                  return (
                    <div
                      key={coupon._id}
                      className="border p-3 border-gray-200 flex justify-between items-center  rounded-lg "
                    >
                      <div className="space-y-1">
                        <p className="text-gray-600 font-medium text-sm">
                          {coupon.title}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {coupon.description}
                        </p>
                        <p className="text-gray-500 text-xs ">
                          Coupon Code :{" "}
                          <span className="font-medium text-sm">
                            {coupon.code}
                          </span>
                        </p>
                      </div>
                      <button
                        className="text-sm text-black transition-colors duration-300 hover:text-blue-600"
                        onClick={() => setCouponCode(coupon.code)}
                      >
                        Apply
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-600">No available coupons</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal</p>
            <p>₹{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Delivery</p>
            <p>₹{"0.00"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Discount</p>
            <p>-₹{total - subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Coupon Discount</p>
            <p>-₹{couponDiscount.toFixed(2)}</p>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-semibold text-lg">
              <p>Total</p>
              <p>₹{total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        className="w-full bg-orange-900 text-white font-semibold py-4 px-6 rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 transition-colors flex items-center justify-center gap-2"
        onClick={continueToPayment}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default OrderSummary;
