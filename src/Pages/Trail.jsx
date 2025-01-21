import Navbar from "../Components/User/Navbar/Navbar.jsx";
import Breadcrumbs from "../Components/User/Breadcrumbs/Breadcrumbs.jsx";
import ProductImages from "../Components/User/ProductImages/ProductImages.jsx";
import ProductImageView from "../Components/User/ProductImageView/ProductImageView.jsx";
import ProductImageViewMobile from "../Components/User/ProductImageView/ProductImageViewMobile.jsx";
import { Star } from "lucide-react";

const Trail = () => {
  const products = [
    { id: 1, src: "product1.jpg", alt: "Product 1" },
    { id: 2, src: "product2.jpg", alt: "Product 2" },
    { id: 3, src: "product3.jpg", alt: "Product 3" },
    { id: 4, src: "product3.jpg", alt: "Product 3" },
  ];
  return (
    <>
      <Navbar />
      <Breadcrumbs productName={"Hershy's Dark"} category={"Milk Chocolate"} />
      <ProductImageViewMobile imageUrl={"./Product.png"} />
      {/* Product detailed container */}

      <div className="flex md:mx-16 lg:mx-16 xl:mx-20 mt-10 lg:h-[300px] xl:h-[450px] gap-7 ">
        {/* All images */}
        <ProductImages products={products} />
        {/* image view area */}
        <ProductImageView imageUrl={"./Product.png"} />
        {/* product details */}
        <div className="sm:mx-0 mx-5 flex flex-col ">
          {/* Brand Name */}
          <h1 className="xl:text-3xl md:text-xl md:font-bold font-semibold">
            HERSHEY'S{" "}
          </h1>
          {/* Product Name */}
          <h2 className="xl:text-xl md:py-3 py-2 ">
            HERSHEY'S EXOTIC DARKRaspberry & Goji Flavor
          </h2>
          {/* Rating */}
          <div className="bg-gray-300 md:w-16 md:h-7 xl:w-16 xl:h-8 h-5 w-10 flex justify-center items-center xl:gap-2 gap-1">
            <p className="font-bold text-xs xl:text-base">4.5</p>
            <Star className="xl:w-4 w-3" />
          </div>
          {/* Price */}
          <h1 className="font-bold text-2xl pt-5 flex gap-2 items-center">
            
            ₹520{" "}
            <span className="text-gray-500 line-through ">
              ₹600
            </span>
            <span className="font-normal text-base text-orange-700">
              (10% OFF)
            </span>
          </h1>
          <p className=" font-semibold pt-1 text-sm">inclusive of all taxes</p>
        </div>
      </div>
    </>
  );
};

export default Trail;
