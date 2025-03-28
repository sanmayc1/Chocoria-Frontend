import { CircularProgress, Pagination } from "@mui/material";
import FilterOptions from "../FilterOptions/FilterOptions.jsx";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCart } from "../../../Services/api/cartApi.js";

const ProductWideList = ({ data, filterData, setFilterData ,loading ,setLoading }) => {
  const [cart, setCart] = useState([]);
  const [update, setUpdate] = useState(false);
  const auth = useSelector((state) => state.auth.auth);
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      const response = await getCart();
      if (response.status === 200) {
        const data = response.data.cart.products.filter(
          (item) => item.productId !== null
        );

        setCart(data);
        setLoading(false);
        return;
      }
    }
    if (auth) {
      fetchCart();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [update]);

  useEffect(() => {
    setLoading(true);
    setPageCount(Math.ceil(data.length / 8));
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    setProducts(data.slice(startIndex, endIndex));
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [data, currentPage]);

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row">
        {/* Filter Section - FilterOptions component handles its own responsiveness */}
        {data && (
          <FilterOptions
            filterData={filterData}
            setFilterData={setFilterData}
          />
        )}
        {/* Product Grid */}
        <div className="w-full lg:w-[80%] px-12 lg:px-20 grid grid-cols-2 xl:grid-cols-4 justify-between md:grid-cols-3 ">
          {/* Products - Using Array to map multiple ProductCards */}
          {!loading ? (
            products.length > 0 ? (
              products.map((item) => (
                <div key={item?._id}>
                  <ProductCard
                    productTitle={item?.name}
                    offer={item?.offer}
                    rating={item.averageRating}
                    imageUrl={item?.images[0]}
                    id={item._id}
                    variants={item?.variants}
                    cart={cart}
                    setUpdate={setUpdate}
                  />
                </div>
              ))
            ) : (
              <div className=" w-full flex justify-center items-start">
                <h1 className="text-2xl font-semibold">No products found</h1>
              </div>
            )
          ) : (
            <div className="h-20 w-full flex justify-center items-center">
              <CircularProgress color="inherit" size={40} />
            </div>
          )}
        </div>
      </div>
      {data.length > 0 && (
        <div className="w-full flex justify-center items-center py-10">
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
          />
        </div>
      )}
    </>
  );
};

export default ProductWideList;
