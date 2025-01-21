import { useState } from "react";

const ProductImages = ({products}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (id)=>{
    setSelectedImage(id)
  }
  return (
   <div className="hidden lg:block" >
     <div className="xl:max-w-24 min-h-full xl:min-w-24 max-h-full lg:min-w-14 flex flex-col gap-4 p-1 ">
      {products?.map((product) => {
        return (
          <div key={product.id}
            className={`bg-white w-full xl:min-h-24 xl:max-h-24 md:min-h-14 md:max-h-14 rounded-xl flex justify-center items-center overflow-hidden ${selectedImage === product.id ?"border border-black":''}`}
            onClick={()=>handleImageClick(product.id)}
          >
            <img src="./Product.png" alt="" className="h-9  object-contain" />
          </div>
        );
      })}
    </div>
   </div>
  );
};
export default ProductImages;
