import { useEffect, useState } from "react";
import { baseUrl } from "../../../Services/api/constants.js";

const ProductImages = ({ images, selectedImage, setSelectedImage }) => {
  const handleImageClick = (url) => {
    setSelectedImage(url);
  };
  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);
  return (
    <div className="hidden lg:block">
      <div className="xl:max-w-24 min-h-full xl:min-w-24 max-h-full lg:min-w-14 flex flex-col gap-4 p-1 ">
        {images?.map((image) => {
          return (
            <div
              key={image}
              className={`bg-white w-full xl:min-h-24 xl:max-h-24 md:min-h-14 md:max-h-14 rounded-xl flex justify-center items-center overflow-hidden ${
                selectedImage === image ? "border border-black" : ""
              }`}
              onClick={() => handleImageClick(image)}
            >
              <img
                src={`${baseUrl}${image}`}
                alt=""
                className="h-9  object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductImages;
