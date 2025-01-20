import ProductCard from "../ProductCard/ProductCard.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import settings from "../../../utils/slickSettings.jsx";
const CardListing = ({ products }) => {
  return (
    <div className="w-[88%] m-auto md:py-10 py-6">
      <Slider {...settings}>
        {products?.map((product) => {
          return (
            <ProductCard
              productTitle={
                "Hersheys Dark White Chocolate mkakke rtro  clear this  and saddg"
              }
              price={"455"}
              imageUrl={"./Product.png"}
              rating={"4.0"}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default CardListing;
