import Banner from "../../Components/User/Banner/Banner.jsx";
import CardListingHeading from "../../Components/User/CardListingHeading/CardListingHeading.jsx";
import CardListing from "../../Components/User/CardListing/CardListing.jsx";
import { useEffect, useState } from "react";
import {
  getPopularProducts,
  getProductsUser,
  getTrendingProducts,
} from "../../Services/api/productApi.js";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import BrandScroll from "../../Components/User/Brand/BrandScroll.jsx";
import { getAllBrandsUser } from "../../Services/api/brand.js";
import CategoriesList from "../../Components/User/Categories/CategoriesList.jsx";
import { getCategoriesUserSide } from "../../Services/api/category.js";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      const response = await getProductsUser();
      const popularResponse = await getPopularProducts();
      const trendingResponse = await getTrendingProducts();
      const brandResponse = await getAllBrandsUser();
      const categoryResponse = await getCategoriesUserSide();
      if (
        response.status === 200 &&
        popularResponse.status === 200 &&
        trendingResponse.status === 200 &&
        brandResponse.status === 200 &&
        categoryResponse.status === 200
      ) {
        setProducts(response.data.products);
        setPopularProducts(popularResponse.data.products);
        setTrendingProducts(trendingResponse.data.products);
        setBrands(brandResponse.data.brands);
        setCategories(categoryResponse.data.categories);
        return;
      }

      toast.error(response.response.data.message, {
        position: "top-center",
      });
    }
    fetchAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };

    return () => {
      window.onpopstate = null;
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Banner />
        <div className="flex justify-center p-5">
          <CardListingHeading heading={"Top Brands"} />
        </div>
        <BrandScroll brands={brands} />
        <CardListingHeading heading={"Products"} />
        <CardListing products={products} />
        <CardListingHeading heading={"Popular Products"} />
        <CardListing products={popularProducts} />
        <CategoriesList categories={categories} />
        <CardListingHeading heading={"Trending Products"} />
        <CardListing products={trendingProducts} />
      </motion.div>
    </>
  );
};

export default Home;
