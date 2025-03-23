import Breadcrumbs from "../../Components/User/Breadcrumbs/Breadcrumbs.jsx";
import ProductImages from "../../Components/User/ProductImages/ProductImages.jsx";
import ProductImageView from "../../Components/User/ProductImageView/ProductImageView.jsx";
import ProductImageViewMobile from "../../Components/User/ProductImageView/ProductImageViewMobile.jsx";
import ProductDetails from "../../Components/User/ProductDetails/ProductDetails.jsx";
import CustomerReviews from "../../Components/User/CustomerReview/CustomerReview.jsx";
import ProductDescription from "../../Components/User/ProductDescription/ProductDescription.jsx";
import CardListingHeading from "../../Components/User/CardListingHeading/CardListingHeading.jsx";
import CardListing from "../../Components/User/CardListing/CardListing.jsx";
import { getProductDetailsUserSide, getRecommendedProducts } from "../../Services/api/productApi.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { baseUrl } from "../../Services/api/constants.js";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";



const ProductDetailedPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendation, setRecommendation] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      const response = await getProductDetailsUserSide(id);
      const recommendedResponse = await getRecommendedProducts(id);
      if (response.status === 200 && recommendedResponse.status === 200) {
        setProduct(response.data.product);
        setRecommendation(recommendedResponse.data.recommendation);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      toast.error(response.response.data.message, {
        position: "top-center",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    fetchProduct();
  }, [location.pathname]);

  useEffect(()=>{
    if(selectedVariant){
      navigate(`/product/${id}?variant=${selectedVariant?._id}`)
    }
   
  },[selectedVariant])




  if (!product) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <CircularProgress color="inherit" size={40} />
      </div>
    );
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumbs second={product.name}  />

        {/* Product detailed container */}
        <ProductImageViewMobile images={product?.images} />
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
          <ProductDetails
            brand={product.brand.name}
            productName={product.name}
            rating={product.averageRating}
            price={selectedVariant?.price}
            actualPrice={selectedVariant?.actualPrice}
            offer={product?.offer}
            stock={selectedVariant?.quantity}
            varients={product.variants}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            id={product._id}
          />
        </div>
        <ProductDescription
          description={product.description}
          ingredients={product.ingredients}
        />
        <CustomerReviews id={id} averageRating={product.averageRating} />
        <CardListingHeading heading={"Recommendation"} />
        <CardListing products={recommendation} />
      </motion.div>
    </>
  );
};

export default ProductDetailedPage;
