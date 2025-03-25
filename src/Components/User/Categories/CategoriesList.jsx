import Slider from "react-slick";
import { settingsForBrandList } from "../../../utils/slickSettings.jsx";
import CategoriesBadge from "./CategoriesBadge.jsx";

const CategoriesList = ({ categories }) => {
  return (
    <div className="flex gap-4 sm:gap-10 justify-center py-10">
      {categories.slice(0, 3).map((category) => (
        <CategoriesBadge
          key={category._id}
          name={category.name}
          id={category._id}
        />
      ))}
    </div>
  );
};

export default CategoriesList;
