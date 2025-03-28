import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="shadow-md w-fit rounded-3xl flex flex-col relative animate-pulse m-2">
   

      <div className="bg-gray-100 max-h-40 min-h-[200px] min-w-[150px] max-w-32 md:min-h-[218px] md:max-h-[218px] md:min-w-[200px] md:max-w-[180px] xl:min-h-[250px] xl:max-h-[250px] xl:min-w-[235px] xl:max-w-[235px] rounded-3xl md:rounded-b-none flex flex-col justify-between">
        {/* Image Skeleton */}
        <div className="w-full overflow-hidden flex justify-center p-4">
          <div className="bg-gray-300 xl:max-h-[130px] md:max-h-[120px] max-h-20 xl:min-h-[130px] md:min-h-[120px] min-h-20 w-full"></div>
        </div>

        {/* Product Title Skeleton */}
        <div className="px-3 xl:px-6">
          <div className="h-4 bg-gray-300 mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-300 w-1/2"></div>
        </div>

        {/* Price and Rating Container */}
        <div className="flex items-center justify-between pb-1 xl:px-4 md:px-3 px-4">
          {/* Price Skeleton */}
          <div className="h-6 bg-gray-300 w-1/3"></div>

          {/* Rating Skeleton */}
          <div className="bg-gray-300 md:w-16 md:h-7 xl:w-14 xl:h-6 h-5 w-10"></div>
        </div>
      </div>

      {/* Add to Cart Button Skeleton */}
      <div className="bg-gray-300 md:h-12 w-full xl:h-14 rounded-b-3xl hidden md:block"></div>
    </div>
  );
};

export default ProductCardSkeleton;