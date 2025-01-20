import ProductCard from "../ProductCard/ProductCard.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './cardListing.css'
import Slider from "react-slick";
const CardListing = ({ products }) => {
    const settings = {
        dots: true, // Show navigation dots
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Number of items to show at a time
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2, // Number of items to show on medium screens
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1, // Number of items to show on small screens
            },
          },
        ],
      };
  return (
    <div className="overflow-x-auto xl:pt-10 pt-5 cards">
      <div className="flex md:space-x-4 space-x-2 xl:px-10 px-4 w-max md:px-10 xl:space-x-5 pb-2">
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
      </div>
    </div>

    // <ProductCard/>
    
  );
};

export default CardListing;
