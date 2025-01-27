import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ProductCard = ({ price, productTitle, rating, imageUrl }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.auth);
 useEffect(() => {}, [auth]);

  const navigateToProductDetailedPage = () => {
    navigate("/productdetailed");
  };

  const addToCard = () => {

    if (!auth) {
      navigate("/login");
      return;
    }else{
      toast.success("Product added to cart", { position: "top-center",autoClose: 1000 });
    }
    
  };
  return (
    <>
      <div className="shadow-md w-fit rounded-3xl flex flex-col">
        {/* Price image rating container */}
        <div
          className="bg-white max-h-40 min-h-[200px] min-w-[150px] max-w-32 md:min-h-[218px] md:max-h-[218px] md:min-w-[200px] md:max-w-[180px] xl:min-h-[250px] xl:max-h-[250px] xl:min-w-[235px] xl:max-w-[235px] rounded-3xl md:rounded-b-none flex flex-col justify-between "
          onClick={navigateToProductDetailedPage}
        >
          {/* Card Image */}

          <div className="w-full overflow-hidden flex justify-center p-4 ">
            <img
              src={imageUrl}
              alt=""
              className="object-scale-down xl:max-h-[130px] md:max-h-[120px] max-h-20 xl:min-h-[130px] md:min-h-[120px] min-h-20 "
            />
          </div>

          {/* Product tittle */}

          <p className="px-3 xl:px-6 font-semibold text-xs xl:text-sm break-words">
            {productTitle?.length < 45
              ? productTitle
              : `${productTitle?.slice(0, 45)}....`}
          </p>

          {/* Price and rating container */}

          <div className="flex items-center justify-between pb-1 xl:px-4 md:px-3 px-4">
            {/* Price */}

            <h5 className="pt-3  font-bold md:text-2xl xl:text-2xl w-2/5 ">
              &#8377;{price}
            </h5>

            {/* Rating */}

            <div className="w-2/5 pt-2 px-3">
              <div className="bg-gray-300 md:w-16 md:h-7 xl:w-14 xl:h-6 h-5 w-10 flex justify-center items-center xl:gap-2 gap-1">
                <p className="font-bold text-xs">{rating}</p>
                <Star className="xl:w-4 w-3" />
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-orange-950 md:h-12 w-full xl:h-14 xl:text-lg  text-white font-semibold rounded-b-3xl hidden md:block hover:bg-orange-900  transition-colors"
          onClick={addToCard}
        >
          Add to cart
        </button>
      </div>
      
    </>
  );
};

export default ProductCard;
