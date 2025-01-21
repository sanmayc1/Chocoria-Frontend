import { Star } from "lucide-react";
import ProductQuantity from "../ProductQuantity/ProductQuantity.jsx";
import Varients from "../Varients/Varients.jsx";


const ProductDetails = () => {
  return (
    <div className="sm:mx-0 mx-5 flex flex-col w-[100%] ">
      {/* Brand Name */}

      <h1 className="xl:text-3xl md:text-xl md:font-bold font-semibold">
        HERSHEY'S{" "}
      </h1>
      {/* Product Name */}

      <h2 className="xl:text-xl md:py-3 py-2 xl:py-5 ">
        HERSHEY'S EXOTIC DARKRaspberry & Goji Flavor
      </h2>
      {/* Rating */}

      <div className="bg-gray-300 md:w-16 md:h-7 xl:w-16 xl:h-8 h-5 w-10 flex justify-center items-center xl:gap-2 gap-1">
        <p className="font-bold text-xs xl:text-base">4.5</p>
        <Star className="xl:w-4 w-3" />
      </div>
      {/* Price */}

      <h1 className="font-bold xl:text-3xl text-2xl pt-5 xl:pt-7 flex gap-2 items-center">
        ₹520{" "}
        <span className="text-gray-700 line-through font-normal text-xl ">
          ₹600
        </span>
        <span className="font-normal text-base text-orange-700">(10% OFF)</span>
      </h1>
      <p className=" font-semibold pt-1 text-sm">inclusive of all taxes</p>
      {/* quantity and varient container */}
      <div className="flex gap-4 xl:pt-5">
        {/* Varients */}

        <Varients />

        {/* Quantitty */}
        <ProductQuantity />
      </div>
      <p className=" font-semibold pt-5 text-sm text-green-700">15 Units in Stock</p>
      {/* Cart and buynow */}
      <div className="pt-9 lg:pt-3 xl:pt-5 grid lg:grid-flow-col gap-3 w-full ">
        <button className="bg-orange-950 md:h-12  xl:h-14 xl:text-lg h-14  text-white font-semibold rounded-3xl hover:bg-orange-900  transition-colors">
          Add to cart
        </button>
        <button className="bg-orange-950 md:h-12 xl:h-14 xl:text-lg h-14  text-white font-semibold rounded-3xl hover:bg-orange-900  transition-colors">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails