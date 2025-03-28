import Slider from "react-slick";
import { settingsForBrandList } from "../../../utils/slickSettings.jsx";
import BrandCard from "./BrandCard.jsx";
import BrandCardSkeleton from "./BrandCardSkeleton.jsx";

const BrandScroll = ({ brands ,loading }) => {
  return (
    <div className="w-[88%] m-auto md:py-10 py-6 hover:scale-105 transition-all duration-500">
      <Slider {...settingsForBrandList}>
        {!loading ? brands?.map((brand) => {
          return <BrandCard key={brand._id} src={brand.image} id={brand._id} />;
        }):[...Array(10)].map((i, index) => <BrandCardSkeleton key={index} />)}
      </Slider>
    </div>
  );
};

export default BrandScroll;
