import Banner from "../../Components/User/Banner/Banner.jsx";
import Navbar from "../../Components/User/Navbar/Navbar.jsx";
import CardListingHeading from "../../Components/User/CardListingHeading/CardListingHeading.jsx";
import CardListing from "../../Components/User/CardListing/CardListing.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPopularProducts, getProductsUser, getTrendingProducts } from "../../Services/api/productApi.js";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    async function fetch_All_Products() {
      const response = await getProductsUser();
      const popularResponse = await getPopularProducts();
      const trendingResponse = await getTrendingProducts()
      if (response.status === 200 && popularResponse.status === 200 && trendingResponse.status === 200) {
        setProducts(response.data.products);
        setPopularProducts(popularResponse.data.products);
        setTrendingProducts(trendingResponse.data.products);
        return;
      }

      toast.error(response.response.data.message, {
        position: "top-center",
      });
    }
    fetch_All_Products();
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
        <CardListingHeading heading={"Products"} viewMore />
        <CardListing products={products} />
        <CardListingHeading heading={"Popular Products"} viewMore />
        <CardListing products={popularProducts} />
        <CardListingHeading heading={"Trending Products"} viewMore />
        <CardListing products={trendingProducts} />
        
      </motion.div>
    </>
  );
};

export default Home;
