import { Check, Plus } from "lucide-react";
import { use, useEffect } from "react";

const SelectAddress = ({
  savedAddresses,
  selectedAddress,
  setSelectedAddress,
  setIsOpen,
  continueToReview,
}) => {
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Shipping Address</h2>

        {/* Saved Addresses */}
        <div className="space-y-3">
          {savedAddresses.map((address) => (
            <div
              key={address._id}
              onClick={() => handleAddressSelect(address)}
              className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                selectedAddress._id === address._id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Selection indicator */}
              <div className="absolute right-4 top-4">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedAddress._id === address._id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedAddress._id === address._id && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>

              {/* Address details */}
              <div className="pr-8">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{address.name}</p>
                  {address.default && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-600 font-medium">
                  {address.address_type}
                </p>
                {address.detailed_address && (
                  <p className="text-gray-600">{address.detailed_address}</p>
                )}
                <p className="text-gray-600">
                  {address.city}, {address.state} {address.pincode}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Address Button */}
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 p-4 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-5 h-5" />
          <span>Add New Address</span>
        </button>

        {/* Continue Button */}
        <button
          className="w-full bg-orange-900 text-white py-3 px-4 rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 transition-colors mt-6"
          onClick={continueToReview}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SelectAddress;
