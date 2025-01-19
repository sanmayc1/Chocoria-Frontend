import Banner from "../Components/User/Banner/Banner.jsx";
import Navbar from "../Components/User/Navbar/Navbar.jsx";
import CardListingHeading from "../Components/User/CardListingHeading/CardListingHeading.jsx";

import ProductCard from "../Components/User/ProductCard/ProductCard.jsx";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <CardListingHeading heading={"Products"} viewMore />
      <div className="overflow-x-auto xl:pt-10 pt-5">
        <div className="flex md:space-x-4 space-x-2 xl:px-10 px-4 w-max md:px-10 xl:space-x-5 pb-2">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        </div>
      </div>
      <CardListingHeading heading={"Product"} />
    </>
  );
};

export default Home;
