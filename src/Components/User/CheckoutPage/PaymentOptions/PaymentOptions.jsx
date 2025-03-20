import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  CreditCardIcon,
  ChevronRight,
  Wallet,
} from "lucide-react";
import { SipOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const PaymentOptions = ({
  selectedMethod,
  setSelectedMethod,
  placeOrder,
  loading,
  totalPrice,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

      <div className="space-y-4">
        {/* COD Option */}
        <div
          onClick={() =>
            setSelectedMethod(totalPrice > 1000 ? "razorpay" : "COD")
          }
          className={`relative p-4 border rounded-lg  transition-all ${
            totalPrice > 1000 ? "cursor-not-allowed  text-gray-500 " : "cursor-pointer"
          } ${
            selectedMethod === "COD"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <Wallet className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium">Cash on Delivery</h3>
              <p className="text-sm text-gray-600">
                {totalPrice > 1000
                  ? "COD not available for orders above ₹1000. Please use another payment method."
                  : "Pay with cash when you receive the order"}
              </p>
            </div>
          </div>
        </div>

        {/* Razorpay Option */}
        <div
          onClick={() => setSelectedMethod("razorpay")}
          className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
            selectedMethod === "razorpay"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <Wallet className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium">Razorpay</h3>
              <p className="text-sm text-gray-600">
                Fast, secure payment with Razorpay
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between font-semibold px-2">
        <p>Total Price</p>
        <p>₹{totalPrice}</p>
        </div>

        {/* Continue Button */}
        <button
          className="w-full bg-orange-900 text-white font-semibold py-4 px-6 rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 transition-colors flex items-center justify-center gap-2"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={20} thickness={4} color="inherit" />
          ) : (
            <>
              {" "}
              <span>Place Order{}</span>
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
