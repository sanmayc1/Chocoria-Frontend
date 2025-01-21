import React, { useState } from 'react';

const ProductDescription = () => {
  const [activeTab, setActiveTab] = useState('details');

  const details = {
    manufacturer: 'FERRERO INDUSTRIALE ITALIA S.r.l.',
    location: 'P.LEP FERRERO 1,I-12051, ALBA, ITALY',
    packedBy: 'FERRERO INDUSTRIALE ITALIA S.r.l.',
    packedLocation: 'P.LEP FERRERO 1,I-12051, ALBA, ITALY',
    importedBy: 'Cocosart Ventures Private Limited',
    dimensions: '18*1*17.5 cm'
  };

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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium placeat enim, eveniet hic laborum natus, aperiam illo laboriosam quibusdam architecto necessitatibus facere. Esse ex ipsa obcaecati voluptatum consequuntur, sunt possimus.</p>
          </>
        )}
        
        {activeTab === 'ingredients' && (
          <div className="py-4">
            {/* Placeholder for ingredients content */}
            <p>Product ingredients information would go here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;