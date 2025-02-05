import React, { useState } from 'react';
import { CreditCard, Plus, CreditCardIcon, ChevronRight } from 'lucide-react';

const PaymentOptions = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [selectedCard, setSelectedCard] = useState('existing_1');

  // Mock saved cards - in real app would come from props/API
  const savedCards = [
    {
      id: 'existing_1',
      last4: '4242',
      brand: 'Visa',
      expiryDate: '12/24',
      isDefault: true
    },
    {
      id: 'existing_2',
      last4: '5555',
      brand: 'Mastercard',
      expiryDate: '09/25',
      isDefault: false
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

      <div className="space-y-4">
        {/* Credit/Debit Card Option */}
        <div 
          onClick={() => setSelectedMethod('card')}
          className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
            selectedMethod === 'card' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <CreditCard className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Credit or Debit Card</h3>
                <div className="flex gap-2">
                  <img src="/api/placeholder/32/20" alt="Visa" className="h-5" />
                  <img src="/api/placeholder/32/20" alt="Mastercard" className="h-5" />
                  <img src="/api/placeholder/32/20" alt="Amex" className="h-5" />
                </div>
              </div>

              {selectedMethod === 'card' && (
                <div className="space-y-3">
                  {/* Saved Cards */}
                  {savedCards.map((card) => (
                    <label
                      key={card.id}
                      className={`flex items-center justify-between p-3 border rounded-md cursor-pointer ${
                        selectedCard === card.id 
                          ? 'border-blue-500 bg-white' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="saved_card"
                          checked={selectedCard === card.id}
                          onChange={() => setSelectedCard(card.id)}
                          className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {card.brand} •••• {card.last4}
                            </span>
                            {card.isDefault && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">Expires {card.expiryDate}</p>
                        </div>
                      </div>
                    </label>
                  ))}

                  {/* Add New Card Button */}
                  <button className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-gray-300 rounded-md text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span>Add New Card</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PayPal Option */}
        <div
          onClick={() => setSelectedMethod('paypal')}
          className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
            selectedMethod === 'paypal'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <CreditCardIcon className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium">PayPal</h3>
              <p className="text-sm text-gray-600">You'll be redirected to PayPal to complete your purchase</p>
            </div>
          </div>
        </div>

        {/* Google Pay Option */}
        <div
          onClick={() => setSelectedMethod('googlepay')}
          className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
            selectedMethod === 'googlepay'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <CreditCardIcon className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium">Google Pay</h3>
              <p className="text-sm text-gray-600">Fast, secure payment with Google Pay</p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button className="w-full bg-orange-900 text-white font-semibold py-4 px-6 rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 transition-colors flex items-center justify-center gap-2">
          <span>Place Order</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;