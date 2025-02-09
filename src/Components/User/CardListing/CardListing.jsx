import ProductCard from "../ProductCard/ProductCard.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import settings from "../../../utils/slickSettings.jsx";
import "./cardlisting.css";
const CardListing = ({ products }) => {
  return (
    <div className="w-[88%] m-auto md:py-10 py-6">
      <Slider  {...settings}>
        {products?.map((product) => {
          return (
            !product.is_deleted && (
              <ProductCard
                key={product._id}
                productTitle={product.name}
                price={product.variants[0].price}
                imageUrl={product.images[0]}
                rating={"4.0"}
                id={product._id}
                variant={product.variants[0]}
              />
            )
          );
        })}
      </Slider>
    </div>
  );
};

export default CardListing;
