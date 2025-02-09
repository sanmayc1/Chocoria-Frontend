import { Search } from "lucide-react";
import FilterOptions from "../../Components/User/FilterOptions/FilterOptions";
import ProductCard from "../../Components/User/ProductCard/ProductCard";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { getProductsUser } from "../../Services/api/productApi";
import { baseUrl } from "../../Services/api/constants";
import { Spa } from "@mui/icons-material";

const SearchPage = () => {
  const [filterData, setFilterData] = useState(null);
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await getProductsUser();
      if (response.status === 200) {
        setData(response.data.products);

        return;
      }

      toast.error(response.response.data.message, {
        position: "top-center",
      });
    };
    fetchAllProducts();
  }, []);

  // handle search input filed
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value) {
      setSearchSuggestion(null);
      return;
    }
    setSearchSuggestion(
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.brand.toLowerCase().includes(value.toLowerCase()) 
      )
    );
  };

  // handle select suggestion
  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    handleSearchSubmit();
  };

  // handle search

  const handleSearchSubmit = () => {
    setFilterData(
      data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    const ser = encodeURIComponent(searchTerm);
    console.log(ser);
    console.log(decodeURIComponent(ser));
    setSearchSuggestion(null);
  };
console.log(searchSuggestion)
  return (
    <div className="w-full h-auto min-h-screen">
      {/* Search Bar */}
      <div className=" w-full flex-col flex items-center mb-10 lg:mb-20 px-4 lg:px-0">
        <div className="bg-white  w-full lg:w-[50%] shadow-sm rounded-t-[30px] rounded-b-[30px] border border-gray-200 ">
          <div className="h-12 lg:h-14 flex items-center px-5">
            <input
              type="text"
              className="w-full h-12 focus:outline-none  text-base lg:text-lg"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="hover:text-gray-500 transition-colors duration-100"
              onClick={handleSearchSubmit}
            >
              <Search size={18} />
            </button>
          </div>
          {/* suggestion */}
          {searchSuggestion?.length > 0 && (
            <div className="w-full h-auto pb-6">
              {searchSuggestion.map((item) => (
                <div
                  key={item._id}
                  className="w-full h-10 hover:bg-gray-100 flex gap-3 items-center py-6  px-5"
                  onClick={() => handleSelectSuggestion(item.name)}
                >
                  {item.images ? (
                    <span className="flex items-center gap-3">
                      <img
                        src={`${baseUrl}${item.images[0]}`}
                        alt=""
                        className=" h-10 object-contain"
                      />
                      {item.name}
                    </span>
                  ) : (
                    <span>
                      <Search size={14} color="gray" />
                      {item.brand}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      {filterData && (
        <div className="w-full flex flex-col lg:flex-row">
          {/* Filter Section - FilterOptions component handles its own responsiveness */}
          {filterData && <FilterOptions />}
          {/* Product Grid */}
          <div className="w-full lg:w-[80%] px-12 lg:px-20 flex flex-wrap gap-4 lg:gap-4 justify-between md:justify-start ">
            {/* Products - Using Array to map multiple ProductCards */}
            {filterData.map((item) => (
              <div key={item?._id}>
                <ProductCard
                  productTitle={item?.name}
                  price={item?.variants[0]?.price}
                  rating={"4"}
                  imageUrl={item?.images[0]}
                  id={item?._id}
                  variant={item?.variants[0]}
                />
              </div>
            ))}
            <div className="w-full flex justify-center items-center py-10">
              <Pagination />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
