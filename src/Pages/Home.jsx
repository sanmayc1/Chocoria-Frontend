import Banner from "../Components/User/Banner/Banner.jsx";
import Navbar from "../Components/User/Navbar/Navbar.jsx";
import CardListingHeading from "../Components/User/CardListingHeading/CardListingHeading.jsx";
import CardListing from "../Components/User/CardListing/CardListing.jsx";
import ProductCard from "../Components/User/ProductCard/ProductCard.jsx";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <CardListingHeading heading={"Products"} viewMore />
      <CardListing products={[1,2,3,4,5,6]}/>
      <CardListingHeading heading={"Product"} />
      
     
    </>
  );
};

export default Home;
