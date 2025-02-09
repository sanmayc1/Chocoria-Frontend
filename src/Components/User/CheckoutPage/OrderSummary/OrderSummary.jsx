import React, { useState } from "react";
import { Package, MapPin, CreditCard, ChevronRight, Tag } from "lucide-react";
import { baseUrl } from "../../../../Services/api/constants";

const OrderSummary = ({ selectedAddress, cart,continueToPayment }) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;

    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      if (couponCode.toUpperCase() === "SAVE10") {
        setAppliedCoupon({
          code: "SAVE10",
          discount: 12.0,
          description: "10% off your order",
        });
      }
      setIsApplying(false);
    }, 1000);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const total = cart.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

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
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal</p>
            <p>₹{total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Delivery</p>
            <p>₹{"0.00"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Discount</p>
            <p>-₹{"0.00"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Coupon Discount</p>
            <p>-₹{"0.00"}</p>
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
      <button className="w-full bg-orange-900 text-white font-semibold py-4 px-6 rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 transition-colors flex items-center justify-center gap-2" 
      onClick={continueToPayment}>
        Confirm Order
      </button>
    </div>
  );
};

export default OrderSummary;
