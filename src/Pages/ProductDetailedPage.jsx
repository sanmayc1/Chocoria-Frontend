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
import { get_product_user } from "../Services/api/productApi.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { baseUrl } from "../Services/api/constants.js";
import { useParams } from "react-router-dom";

const ProductDetailedPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendation,setRecommendation] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    async function fetch_All_Products() {
      const response = await get_product_user(id);
      if (response.status === 200) {
        setProduct(response.data.product);
        setRecommendation(response.data.recomendation)
        return;
      }

      toast.error(response.response.data.message, {
        position: "top-center",
      });
    }
    fetch_All_Products();
  }, []);


  if (!product) {
    return <div>Loading...</div>; // Display loading while products are being fetched
  }
  return (
    <>
      <Navbar/>
      <Breadcrumbs productName={product.name} category={"Milk Chocolate"} />

      {/* Product detailed container */}
      <ProductImageViewMobile imageUrl={"./Product.png"} />
      <div className="flex md:mx-16 lg:mx-16 xl:mx-20 mt-10 lg:h-[360px] xl:h-[450px] gap-7 ">
        {/* All images */}
        <ProductImages
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          images={product?.images}
        />
        {/* image view area */}
        <ProductImageView imageUrl={`${baseUrl}${selectedImage}`} />
        {/* product details */}
        <ProductDetails brand={product.brand} productName={product.name} price={product.variants[0].price} stock={product.variants[0].quantity} />
      </div>
      <ProductDescription description={product.description} ingredients={product.ingredients} />
      <CustomerReviews />
      <CardListingHeading heading={"Recommendation"} />
      <CardListing products={recommendation}/>
      <Footer />
    </>
  );
};

export default ProductDetailedPage;
