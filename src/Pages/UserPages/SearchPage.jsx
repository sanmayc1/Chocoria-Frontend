import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { searchProduct } from "../../Services/api/productApi.js";
import { baseUrl } from "../../Services/api/constants.js";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState(null);
  const navigate = useNavigate();
  const { query } = useParams() ;

  useEffect(() => {
    if (query) {
      setSearchTerm(decodeURIComponent(query));
    }
    window.scrollTo(0, 0);
  }, [query]);

  // handle search input filed
  const handleSearch = async (e) => {
    const value = e.target.value;
    if(/[^a-zA-Z0-9\s]/.test(value)){
      return;
    }
    setSearchTerm(value);
    if (!value.trim()) {
      setSearchSuggestion(null);
      return;
    }
    const query = encodeURIComponent(value);
    const response = await searchProduct(query);
    if (response.status === 200) {
      const data = response.data.products;
      if (data.length > 0) {
        setSearchSuggestion(data.slice(0, 3));
      } else {
        setSearchSuggestion(null);
      }
      return;
    }
    setSearchSuggestion(null);
  };

  // handle select suggestion
  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    handleSearchSubmit(suggestion);
  };

  // handle search

  const handleSearchSubmit = (suggestion) => {
    if (!suggestion.trim()) {
      return;
    }
    const query = encodeURIComponent(suggestion);
    navigate(`/search/${query}`);
    setSearchSuggestion(null);
  };

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
              onClick={() => handleSearchSubmit(searchTerm)}
            >
              <Search size={18} />
            </button>
          </div>
          {/* suggestion */}
          {searchSuggestion?.length > 0 && (
            <div className="w-full h-auto pb-6">
              {searchSuggestion?.map((item) => (
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

      <Outlet />
    </div>
  );
};

export default SearchPage;
