const ProductImageView = ({imageUrl}) => {
  return (
    <>
  <div className="hidden lg:block">
  <div className="h-full xl:w-[630px] lg:w-[420px] bg-white rounded-xl flex justify-center items-center">
        <img
          src={imageUrl}
          alt=""
          className="object-contain xl:h-[300px] md:h-[200px]"
        />
      </div>
  </div>
    </>
  );
};

export default ProductImageView;
