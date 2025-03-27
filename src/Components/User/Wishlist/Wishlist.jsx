import { useEffect, useState } from "react";
import WishlistItems from "./WishlistItems.jsx";
import { getWishlist } from "../../../Services/api/whishlistApi.js";

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);
    const [updateWishlist, setUpdateWishlist] = useState(false);
  useEffect(() => {
    const fetchWishlist = async ()=>{
      const response = await getWishlist();
      if(response.status === 200){
        setWishlist(response.data.wishlist.products);
      }
    }
    fetchWishlist()
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [updateWishlist])

  return (
    <div className="min-h-screen flex justify-center">
      <div className="bg-white rounded-3xl w-[95%] sm:w-[70%] p-5 h-fit shadow-md ">
        <h3 className="text-2xl sm:text-3xl font-bold mb-5 ml-2">{`Wishlist (${wishlist.length ||0})`}</h3>
        <div className="border border-gray-300   rounded-2xl">

            {
              wishlist.length > 0 ? (

                wishlist.map((product)=>(
                  <WishlistItems key={product._id} product={product} setUpdateWishlist={setUpdateWishlist} updateWishlist={updateWishlist} />
                ))
               
              ):(
                <p className="text-center py-10">Wishlist is empty!</p>
              )
            }
            
        </div>

      </div>
    </div>
  );
};

export default Wishlist;
