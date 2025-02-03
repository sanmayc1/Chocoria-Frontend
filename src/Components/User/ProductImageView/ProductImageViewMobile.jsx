import Slider from "react-slick";
import { settingsForProductView } from "../../../utils/slickSettings.jsx";
import { baseUrl } from "../../../Services/api/constants.js";

const ProductImageViewMobile = ({ images }) => {
  return (
    <>
      <div className="block lg:hidden w-[88%] m-auto px-5">
        <Slider {...settingsForProductView} className="h-[350px]">
          {images.map((image, index) => (
            <div>
              <div className="flex justify-center items-center h-[350px]">
                <img
                  src={`${baseUrl}${image}`}
                  alt="First product"
                  className="object-contain h-[80%] max-h-[300px] "
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ProductImageViewMobile;
