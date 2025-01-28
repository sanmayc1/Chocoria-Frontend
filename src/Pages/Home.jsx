import Banner from "../Components/User/Banner/Banner.jsx";
import Navbar from "../Components/User/Navbar/Navbar.jsx";
import CardListingHeading from "../Components/User/CardListingHeading/CardListingHeading.jsx";
import CardListing from "../Components/User/CardListing/CardListing.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {  get_products_user } from "../Services/api/productApi.js";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetch_All_Products() {
      const response = await get_products_user();
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

  return (
    <>
      <Navbar />
      <Banner />
      <CardListingHeading heading={"Products"} viewMore />
      <CardListing products={products} />
      <CardListingHeading heading={"Product"} />
    </>
  );
};

export default Home;
