import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getCategoriesUserSide } from "../../../Services/api/category";
import { getAllBrandsUser } from "../../../Services/api/brand";

const FilterOptions = ({ filterData, setFilterData }) => {
  const [toggleSelect, setToggleSelect] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesUserSide();
        const brandResponse = await getAllBrandsUser();
        if (res.status === 200 && brandResponse.status === 200) {
          setCategory(res.data.categories);
          setBrands(brandResponse.data.brands);
        }
      } catch (error) {}
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden w-full px-4 py-2 sticky top-0  z-96 pb-5">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="w-full py-2 bg-gray-100 rounded-md flex items-center justify-center gap-2"
        >
          <span className="font-semibold">Filters</span>
          <span>{isMobileFilterOpen ? "−" : "+"}</span>
        </button>
      </div>

      {/* Filter Container */}
      <div
        className={`
        lg:w-[20%] w-full h-auto lg:min-h-screen px-4 lg:px-8 pt-4 pb-6
        lg:block ${isMobileFilterOpen ? "block" : "hidden"}
      `}
      >
        {/* Desktop Title */}
        <p className="text-xl font-semibold border-b border-gray-300 pb-4 lg:block hidden">
          Filters
        </p>

        {/* Sort By */}
        <div className="border-b border-gray-300 py-1">
          <p
            className="font-semibold flex justify-between pb-2 cursor-pointer"
            onClick={() =>
              setToggleSelect(toggleSelect === "sortBy" ? null : "sortBy")
            }
          >
            Sort By <span>{toggleSelect === "sortBy" ? "-" : "+"}</span>
          </p>
          <div
            className={`flex-col gap-1 ${
              toggleSelect === "sortBy" ? "flex" : "hidden"
            }`}
          >
            <label htmlFor="popularity" className="cursor-pointer">
              <input
                type="radio"
                name="sortBy"
                value="popularity"
                onChange={handleChange}
                checked={filterData.sortBy === "popularity"}
              />
              <span className="pl-2">Popularity</span>
            </label>
            <label htmlFor="highToLow" className="cursor-pointer">
              <input
                type="radio"
                name="sortBy"
                value="highToLow"
                onChange={handleChange}
                checked={filterData.sortBy === "highToLow"}
              />
              <span className="pl-2">High to Low</span>
            </label>
            <label htmlFor="lowToHigh" className="cursor-pointer">
              <input
                type="radio"
                name="sortBy"
                value="lowToHigh"
                onChange={handleChange}
                checked={filterData.sortBy === "lowToHigh"}
              />
              <span className="pl-2">Low to High</span>
            </label>
            <label htmlFor="newArrival" className="cursor-pointer">
              <input
                type="radio"
                name="sortBy"
                value="newArrival"
                onChange={handleChange}
                checked={filterData.sortBy === "newArrival"}
              />
              <span className="pl-2">New Arrival</span>
            </label>
            <label htmlFor="aA-zZ" className="cursor-pointer">
              <input
                type="radio"
                name="sortBy"
                value="aA-zZ"
                onChange={handleChange}
                checked={filterData.sortBy === "aA-zZ"}
              />
              <span className="pl-2">A to Z</span>
            </label>
            <label htmlFor="zZ-aA" className="cursor-pointer">
              <input
                type="radio"
                name="sortBy"
                value="zZ-aA"
                onChange={handleChange}
                checked={filterData.sortBy === "zZ-aA"}
              />
              <span className="pl-2">Z to A</span>
            </label>
          </div>
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-1 border-b border-gray-300 pb-2">
          <p
            className="font-semibold flex justify-between pb-2 cursor-pointer"
            onClick={() =>
              setToggleSelect(toggleSelect === "rating" ? null : "rating")
            }
          >
            Rating <span>{toggleSelect === "rating" ? "-" : "+"}</span>
          </p>
          <div
            className={`flex-col gap-2 ${
              toggleSelect === "rating" ? "flex" : "hidden"
            }`}
          >
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                htmlFor={`${rating}star`}
                className="flex cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  onChange={handleChange}
                  checked={filterData.rating == rating}
                />
                <span className="pl-2 flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill={index < rating ? "black" : "none"}
                    />
                  ))}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="border-b border-gray-300 py-1">
          <p
            className="font-semibold flex justify-between pb-2 cursor-pointer"
            onClick={() =>
              setToggleSelect(toggleSelect === "category" ? null : "category")
            }
          >
            Category <span>{toggleSelect === "category" ? "-" : "+"}</span>
          </p>
          <div
            className={`flex-col gap-1 ${
              toggleSelect === "category" ? "flex" : "hidden"
            }`}
          >
            <label htmlFor="milkChocolate" className="cursor-pointer">
              <input
                type="radio"
                name="category"
                value=""
                onChange={handleChange}
                checked={filterData.category === ""}
              />
              <span className="pl-2">All Categories</span>
            </label>
            {category.map((item) => (
              <label
                key={item._id}
                htmlFor="milkChocolate"
                className="cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  value={item._id}
                  onChange={handleChange}
                  checked={filterData.category === item._id}
                />
                <span className="pl-2">{item.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div className="border-b border-gray-300 py-1">
          <p
            className="font-semibold flex justify-between pb-2 cursor-pointer"
            onClick={() =>
              setToggleSelect(toggleSelect === "brand" ? null : "brand")
            }
          >
            Brand <span>{toggleSelect === "brand" ? "-" : "+"}</span>
          </p>
          <div
            className={`flex-col gap-1 ${
              toggleSelect === "brand" ? "flex" : "hidden"
            }`}
          >
            <label htmlFor="brand" className="cursor-pointer">
              <input
                type="radio"
                name="brand"
                value=""
                onChange={handleChange}
                checked={filterData.brand === ""}
              />
              <span className="pl-2">All Brands</span>
            </label>
            {brands.map((item) => (
              <label
                key={item._id}
                htmlFor="brand"
                className="cursor-pointer"
              >
                <input
                  type="radio"
                  name="brand"
                  value={item._id}
                  onChange={handleChange}
                  checked={filterData.brand === item._id}
                />
                <span className="pl-2 uppercase">{item.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterOptions;
