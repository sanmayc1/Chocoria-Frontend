import { Star } from "lucide-react";

const ProductCard = ({ price, productTitle, rating, imageUrl }) => {
  return (
    <>
      <div className="bg-white shadow-md md:min-h-[280px] md:max-h-[220px] md:min-w-[200px] md:max-w-[180px] xl:min-h-[334px] xl:max-h-[334px] min-h-[200px] max-h-40 min-w-[150px] max-w-32 xl:min-w-[235px] xl:max-w-[235px]  rounded-3xl">
        <div className="flex flex-col justify-between h-full">
          {/* Card Image */}

          <div className="w-full overflow-hidden flex justify-center p-4 ">
            <img
              src={imageUrl}
              alt=""
              className="object-scale-down xl:max-h-[130px] md:max-h-[120px] max-h-20 xl:min-h-[130px] md:min-h-[120px] min-h-20 "
            />
          </div>

          {/* Product tittle */}

          <p className="px-3 xl:px-6 font-semibold text-xs xl:text-sm break-words">
            {productTitle?.length < 63
              ? productTitle
              : `${productTitle?.slice(0, 63)}....`}
          </p>

          <div className="flex items-center justify-between pb-1 xl:px-4 md:px-3 px-4">
            {/* Price */}

            <h5 className="pt-3  font-bold md:text-2xl xl:text-2xl w-2/5 ">
              &#8377;{price}
            </h5>

            {/* Rating */}

            <div className="w-2/5 pt-2 px-3">
              <div className="bg-gray-300 md:w-16 md:h-7 xl:w-14 xl:h-6 h-5 w-10 flex justify-center items-center xl:gap-2 gap-1">
                <p className="font-bold text-xs">{rating}</p>
                <Star className="xl:w-4 w-3" />
              </div>
            </div>
          </div>
          {/* Add to cart Button */}
          <button className="bg-orange-950 md:h-12 w-full xl:h-14 xl:text-lg  text-white font-semibold rounded-b-3xl hidden md:block hover:bg-orange-900 xl:mt-2 transition-colors">
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
