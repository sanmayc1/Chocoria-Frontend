import React, { useState } from 'react';

const ProductDescription = ({description,ingredients}) => {
  const [activeTab, setActiveTab] = useState('details');

 
  return (
    <div className="w-full my-20 xl:my-40">
      {/* Tabs */}
      <div className="flex gap-6 mb-4 justify-center items-center">
        <button
          onClick={() => setActiveTab('details')}
          className={`px-8 py-4 rounded-full text-sm transition-colors ${
            activeTab === 'details'
              ? 'bg-brown-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          style={{ backgroundColor: activeTab === 'details' ? '#5D4037' : '' }}
        >
          Item Details
        </button>
        <button
          onClick={() => setActiveTab('ingredients')}
          className={`px-8 py-4 rounded-full transition-colors ${
            activeTab === 'ingredients'
              ? 'bg-brown-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          style={{ backgroundColor: activeTab === 'ingredients' ? '#5D4037' : '' }}
        >
          Ingredients
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3 text-sm text-gray-600 lg:px-36 xl:px-52 xl:text-lg px-16">
        {activeTab === 'details' && (
          <>
            <p>{description}</p>
          </>
        )}
        
        {activeTab === 'ingredients' && (
          <div className="py-4">
            {/* Placeholder for ingredients content */}
            <p>{ingredients}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;