import { useState } from "react";
import AddEditForm from "./Add-Edit-Form.jsx";
import { v4 as uuid } from "uuid";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([
    { id: uuid(), size: "", price: "", quantity: "" },
  ]);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    brand: "",
    category: "",
    productDescription: "",
    ingredients: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <>
      <AddEditForm
        images={images}
        setImages={setImages}
        variants={variants}
        setVariants={setVariants}
        title={"Add Product"}
        productDetails={productDetails}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default AddProduct;
