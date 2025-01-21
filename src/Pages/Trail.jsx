import Navbar from "../Components/User/Navbar/Navbar.jsx";
import Breadcrumbs from "../Components/User/Breadcrumbs/Breadcrumbs.jsx";
import ProductImages from "../Components/User/ProductImages/ProductImages.jsx";
import ProductImageView from "../Components/User/ProductImageView/ProductImageView.jsx";
import ProductImageViewMobile from "../Components/User/ProductImageView/ProductImageViewMobile.jsx";
import ProductDetails from "../Components/User/ProductDetails/ProductDetails.jsx";
import CustomerReviews from "../Components/User/CustomerReview/CustomerReview.jsx";
import ProductDescription from "../Components/User/ProductDescription/ProductDescription.jsx";
import CardListingHeading from "../Components/User/CardListingHeading/CardListingHeading.jsx";
import CardListing from "../Components/User/CardListing/CardListing.jsx";
import Footer from "../Components/User/Footer/Footer.jsx";

const Trail = () => {
  const products = [
    { id: 1, src: "product1.jpg", alt: "Product 1" },
    { id: 2, src: "product2.jpg", alt: "Product 2" },
    { id: 3, src: "product3.jpg", alt: "Product 3" },
    { id: 4, src: "product3.jpg", alt: "Product 3" },
  ];
  return (
    <>
      <Navbar />
      <Breadcrumbs productName={"Hershy's Dark"} category={"Milk Chocolate"} />

      {/* Product detailed container */}
      <ProductImageViewMobile imageUrl={"./Product.png"} />
      <div className="flex md:mx-16 lg:mx-16 xl:mx-20 mt-10 lg:h-[360px] xl:h-[450px] gap-7 ">
        {/* All images */}
        <ProductImages products={products} />
        {/* image view area */}
        <ProductImageView imageUrl={"./Product.png"} />
        {/* product details */}
        <ProductDetails />
      </div>
      <ProductDescription/>
      <CustomerReviews />
      <CardListingHeading heading={"Recommendation"}/>
      <CardListing products={[1,2,3,4,5,6]}/>
      <Footer/>
    </>
  );
};

export default Trail;
