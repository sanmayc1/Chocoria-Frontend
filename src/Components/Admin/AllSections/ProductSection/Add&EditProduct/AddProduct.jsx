import { useState } from "react";
import AddEditForm from "./Add-Edit-Form.jsx";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { add_product } from "../../../../../Services/api/productApi.js";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [variants, setVariants] = useState([
    { id: uuid(), weight: "", price: "", quantity: "" },
  ]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    ingredients: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validating productDetails fields are not empty
    const { name, brand, category, description, ingredients } = productDetails;
    if (
      !name.trim() ||
      !brand.trim() ||
      !category.trim() ||
      !description.trim() ||
      !ingredients.trim()
    ) {
      toast.error("All fields are required. Please fill in all fields.", {
        position: "top-center",
        theme: "dark",
      });
      return null;
    }

    // validating varient fileds

    const { weight, price, quantity } = variants[variants.length - 1];
    if (!weight.trim() || !price || !quantity) {
      toast.error("Please fill variant field", {
        position: "top-center",
      });
      return null;
    }
    // validating image
    if (images.length < 3) {
      if (images.length <= 0) {
        toast.error("Please upload image", {
          position: "top-center",
        });
      } else {
        toast.error("Minimun 3 image needed", {
          position: "top-center",
        });
      }
      return null;
    }

    // upload to backend

    const formData = new FormData();

    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("ingredients", ingredients);
    // variants

    formData.append("variants", JSON.stringify(variants));
    // images
    images.forEach((image, index) => {
      formData.append("images[]", image.img, `image${index}.jpg`);
    });

    // send to backend
    const response = await add_product(formData);
    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate("/admin/product");
      }, 2000);

      return null;
    }

    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 1500,
    });
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
