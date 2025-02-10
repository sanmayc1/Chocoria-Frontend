import { useEffect, useState } from "react";
import ProductWideList from "../ProductWideList/ProductWideList.jsx";
import { searchProduct } from "../../../Services/api/productApi.js";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const ProductSearchResult = () => {
  const [data, setData] = useState([]);

  const { query } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialFilterData = {
    sortBy: searchParams.get("sortBy") || "",
    rating: searchParams.get("rating") || "",
    category: searchParams.get("category") || "",
  };

  const [filterData, setFilterData] = useState(initialFilterData);

  useEffect(() => {
    setFilterData(initialFilterData);
  }, [query]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await searchProduct(query, filterData);
      if (response.status === 200) {
        setData(response.data.products);
        return;
      }
      toast.error(response.response.data.message, {
        position: "top-center",
      });
    };
    fetchProducts();
  }, [query, filterData]);

  useEffect(() => {
    navigate({
      pathname: `/search/${query}`,
      search: `?sortBy=${filterData.sortBy}&rating=${filterData.rating}&category=${filterData.category}`,
    });
  }, [filterData, navigate]);
  return (
    <ProductWideList
      data={data}
      filterData={filterData}
      setFilterData={setFilterData}
    />
  );
};

export default ProductSearchResult;
