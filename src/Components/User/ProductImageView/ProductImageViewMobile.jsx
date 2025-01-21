import Slider from "react-slick";
import { settingsForProductView } from "../../../utils/slickSettings.jsx";

const ProductImageViewMobile = ({ imageUrl }) => {
  return (
    <>
      <div className="block lg:hidden w-[88%] m-auto px-5">
  <Slider {...settingsForProductView} className="h-[350px]">
    <div >
     <div className="flex justify-center items-center h-[350px]">
         <img
        src="3.png"
        alt="First product"
        className="object-contain h-[80%] max-h-[300px] "
        loading="lazy"
      />
     </div>
    </div>
    <div >
     <div className="flex justify-center items-center h-[350px]">
         <img
        src="Product.png"
        alt="First product"
        className="object-contain h-[80%] max-h-[300px] "
        loading="lazy"
      />
     </div>
    </div>
   
  </Slider>
</div>
    </>
  );
};

export default ProductImageViewMobile;
