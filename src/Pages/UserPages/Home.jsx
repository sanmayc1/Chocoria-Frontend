import Banner from "../../Components/User/Banner/Banner.jsx";
import Navbar from "../../Components/User/Navbar/Navbar.jsx";
import CardListingHeading from "../../Components/User/CardListingHeading/CardListingHeading.jsx";
import CardListing from "../../Components/User/CardListing/CardListing.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductsUser } from "../../Services/api/productApi.js";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetch_All_Products() {
      const response = await getProductsUser();
      if (response.status === 200) {
        setProducts(response.data.products);
        
        return;
      }

      toast.error(response.response.data.message, {
        position: "top-center",
      });
    }
    fetch_All_Products();
  }, []);

  useEffect(() => {
    // Prevent back navigation
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
    // Clean up the event listener when the component unmounts
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
        
      </motion.div>
    </>
  );
};

export default Home;
