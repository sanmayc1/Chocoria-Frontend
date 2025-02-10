import { CircularProgress, Pagination } from "@mui/material";
import FilterOptions from "../FilterOptions/FilterOptions.jsx";
import ProductCard from "../ProductCard/ProductCard.jsx";

const ProductWideList = ({ data, filterData, setFilterData }) => {
  if (!data) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <CircularProgress color="inherit" size={40} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col lg:flex-row">
      {/* Filter Section - FilterOptions component handles its own responsiveness */}
      {data && (
        <FilterOptions filterData={filterData} setFilterData={setFilterData} />
      )}
      {/* Product Grid */}
      <div className="w-full lg:w-[80%] px-12 lg:px-20 flex flex-wrap gap-4 lg:gap-4 justify-between md:justify-start ">
        {/* Products - Using Array to map multiple ProductCards */}
        {data.length > 0 ? (
          data.map((item) => (
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
          ))
        ) : (
          <div className=" w-full flex justify-center items-start">
            <h1 className="text-2xl font-semibold">No products found</h1>
          </div>
        )}
        {data.length > 0 && (
          <div className="w-full flex justify-center items-center py-">
            <Pagination />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductWideList;
