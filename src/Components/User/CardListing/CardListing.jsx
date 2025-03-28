import ProductCard from "../ProductCard/ProductCard.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import settings from "../../../utils/slickSettings.jsx";
import "./cardlisting.css";
import { useEffect, useState } from "react";
import { getCart } from "../../../Services/api/cartApi.js";
import { useSelector } from "react-redux";
import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton.jsx";
const CardListing = ({ products, loading, setLoading }) => {
  const [cart, setCart] = useState([]);
  const [update, setUpdate] = useState(false);
  const auth = useSelector((state) => state.auth.auth);

  useEffect(() => {
    async function fetchCart() {
      const response = await getCart();
      if (response.status === 200) {
        const data = response.data.cart.products.filter(
          (item) => item.productId !== null
        );

        setCart(data);
        return;
      }
    }
    if (auth) {
      fetchCart();
    }
  }, [update]);

  return (
    <div className="w-[88%] m-auto md:py-10 py-6 hover:scale-105 transition-all  duration-500">
      <Slider {...settings}>
        {!loading
          ? products?.map((product) => {
              return (
                !product.is_deleted && (
                  <ProductCard
                    key={product._id}
                    productTitle={product.name}
                    offer={product.offer}
                    imageUrl={product.images[0]}
                    rating={product.averageRating}
                    id={product._id}
                    variants={product.variants}
                    cart={cart}
                    setUpdate={setUpdate}
                  />
                )
              );
            })
          : [...Array(10)].map((i, index) => <ProductCardSkeleton key={index} />)}
      </Slider>
    </div>
  );
};

export default CardListing;
