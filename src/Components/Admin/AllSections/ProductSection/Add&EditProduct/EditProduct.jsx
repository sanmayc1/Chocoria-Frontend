import { useEffect, useState } from "react";
import AddEditForm from "./Add-Edit-Form.jsx";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { add_product, edit_product, get_product_details } from "../../../../../Services/api/productApi.js";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../../../Services/api/constants.js";

const EditProduct = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [variants, setVariants] = useState([
    { _id: uuid(), weight: "", price: "", quantity: "" },

  ]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    ingredients: "",
  });
 const params=useParams()
 const urlToBlob = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return blob; // You can now use this blob
    } catch (error) {
      console.error("Error converting URL to Blob:", error);
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      const response = await get_product_details(params.id);
      if (response.status === 200) {
        setProductDetails(response.data.product);
        
        const fetchImages = async () => {
            const imageBlobs = await Promise.all(
              response.data.product.images.map(async (image) => {
                const blob = await urlToBlob(baseUrl + image);
                return { id: uuid(), img: blob };
              })
            );
          
            setImages(imageBlobs);
          };
        fetchImages();
        // setImages(response.data.product.images);
        setVariants(response.data.product.variants);

        return null;
      }
      toast.error(response.response.data.message);
    }
    fetchProduct();
  }, [params.id]);

  

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
    if (!weight.trim() || !price || !quantity.toString().trim()) {
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
    const response = await edit_product(formData, params.id);
    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1500,
      });
     
        navigate("/admin/product");
   

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
        title={"Edit Product"}
        submit_button_name={"Update"}
        productDetails={productDetails}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default EditProduct;
