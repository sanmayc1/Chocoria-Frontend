import { useEffect, useState } from "react";
import SingleInputField from "../../../HelperComponents/SingleInputField.jsx";
import { getCategoriesUserSide } from "../../../../Services/api/category.js";
import { getProductsUser } from "../../../../Services/api/productApi.js";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const OfferAddEditForm = ({ offerData, setOfferData, handleSubmit }) => {
  const [categoryOrProduct, setCategoryOrProduct] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategoriesUserSide();
      if (response.status === 200) {
        const data = response.data.categories.filter(
          (category) => category.is_deleted === false
        );
        setCategories(data);
      }
    };
    const fetchProducts = async () => {
      const response = await getProductsUser();
      if (response.status === 200) {
        const data = response.data.products.filter(
          (product) => product.is_deleted === false
        );
        setProducts(data);
      }
    };
    fetchCategories();
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setOfferData({ ...offerData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1 className="font-semibold text-lg text-center pb-5 ">Add Offer</h1>
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-3 w-full">
          <label
            htmlFor="offerTitle"
            className="w-1/2 flex flex-col gap-1 text-sm"
          >
            Offer Title
            <SingleInputField
              placeholder={"Offer Name"}
              noLimitWidth
              value={offerData.offerTitle}
              handleChange={handleChange}
              name={"offerTitle"}
            />
          </label>
          <label
            htmlFor="offerPercentage"
            className=" flex flex-col gap-1 w-1/2 text-sm"
          >
            Offer Percentage
            <SingleInputField
              placeholder={"Offer Percentage"}
              filedType={"number"}
              value={offerData.percentage}
              handleChange={handleChange}
              name={"percentage"}
            />
          </label>
        </div>
        <div className="w-full flex gap-3">
          <label
            htmlFor="offerExpiryDate"
            className=" flex flex-col gap-1 w-1/2 text-sm"
          >
            Offer Expiry Date
            <input
              type="Date"
              className="w-full p-3 bg-gray-200 rounded-lg "
              min={new Date().toISOString().split("T")[0]}
              value={offerData.expiryDate}
              onChange={handleChange}
              name={"expiryDate"}
            />
          </label>
          <label
            htmlFor="offerAppliedOn"
            className="w-1/2 flex flex-col gap-1 text-sm"
          >
            Offer Applied On
            <select
              name="applicableOn"
              className="w-full p-3 bg-gray-200 rounded-lg "
              value={offerData.applicableOn}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="category">Category</option>
              <option value="product">Product</option>
            </select>
          </label>
        </div>

        {offerData.applicableOn === "category" && (
          <label
            htmlFor="offerAppliedOn"
            className="w-full flex flex-col gap-1 text-sm"
          >
            Select Spesific Category
            <select
              name="specific"
              className="w-full p-3 bg-gray-200 rounded-lg "
              value={offerData.specific}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        )}
        {offerData.applicableOn === "product" && (
          <label
            htmlFor="offerAppliedOn"
            className="w-full flex flex-col gap-1 text-sm"
          >
            Select Spesific Product
            <select
              name="specific"
              className="w-full p-3 bg-gray-200 rounded-lg "
              value={offerData.specific}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <div className="w-full pt-3">
          <Button
            onClick={handleSubmit}
            style={{ backgroundColor: "black", color: "white" }}
            size="large"
            className="w-full"
          >
            Add Offer
          </Button>
        </div>
      </div>
    </>
  );
};

export default OfferAddEditForm;
