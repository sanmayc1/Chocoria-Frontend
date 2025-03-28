import { useEffect, useState } from "react";
import ProductWideList from "../ProductWideList/ProductWideList.jsx";
import { searchProduct } from "../../../Services/api/productApi.js";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductSearchResult = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialFilterData = {
    sortBy: searchParams.get("sortBy") || "",
    rating: searchParams.get("rating") || "",
    category: searchParams.get("category") || "",
    brand: searchParams.get("brand") || ""
  };

  const [filterData, setFilterData] = useState(initialFilterData);

  useEffect(() => {
    setFilterData(initialFilterData);
  }, [query]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await searchProduct(query, filterData);
      if (response.status === 200) {
        setData(response.data.products);
        setLoading(false);
        return;
      }
      setLoading(false);
      toast.error(response.response.data.message, {
        position: "top-center",
      });
    };
    fetchProducts();
  }, [query, filterData]);
  

  useEffect(() => {
    navigate({
      pathname: `/search/${query}`,
      search: `?sortBy=${filterData.sortBy}&rating=${filterData.rating}&category=${filterData.category}&brand=${filterData.brand}`,
    });
  }, [filterData, navigate]);
  return (
    <ProductWideList
      data={data}
      filterData={filterData}
      loading={loading}
      setLoading={setLoading}
      setFilterData={setFilterData}
    />
  );
};

export default ProductSearchResult;
