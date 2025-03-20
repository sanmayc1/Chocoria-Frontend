import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../../../HelperComponents/Modal.jsx";
import ImageCropper from "../ImageCroper.jsx";
import { Crop } from "lucide-react";
import { useRef } from "react";
import { get_categories } from "../../../../../Services/api/category";
import { getAllBrands } from "../../../../../Services/api/brand.js";
const AddEditForm = ({
  images,
  setImages,
  variants,
  setVariants,
  title,
  productDetails,
  handleChange,
  handleSubmit,
  submit_button_name,
}) => {
  const [holdImage, setHoldImage] = useState(null);
  const [editImageid, setEditImageId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands ,setBrand] = useState([])
  const inputFileRef = useRef(null);

  // fetch the available categories

  useEffect(() => {
    async function fetchCategories() {
      const response = await get_categories();
      if (response.status === 200) {
        setCategories(response.data.categories);
        return null;
      }
      toast.error(response.response.data.message);
    }

    async function fetchBrand() {
      const response = await getAllBrands();
      if (response.status === 200) {
        setBrand(response.data.brands);
        return null;
      }
      toast.error(response.response.data.message);
    }

    fetchCategories();
    fetchBrand()

  }, []);

  const handleImageUpload = (e) => {
    if (images.length >= 4) {
      toast.error("Maximum 4 images", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);

    setHoldImage(imgUrl);
    setIsOpen(true);
  };

  // Clear the img chosen
  const inputFileClear = () => {
    inputFileRef.current.value = null;
  };
  // close the image crop modal
  const onClose = () => {
    setIsOpen(false);
    inputFileClear();
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  // edit image modal will open
  const editCrop = (image) => {
    setHoldImage(URL.createObjectURL(image.img));
    setEditImageId(image.id);
    setIsOpen(true);
  };

  const addVariant = () => {
    const { weight, price, quantity } = variants[variants.length - 1];
    if (!weight.trim() || !price || !quantity.toString().trim()) {
      toast.error("Please fill existing variant field", {
        position: "top-center",
      });
      return null;
    }
    setVariants((prev) => [
      ...prev,
      { _id: uuidv4(), weight: "", price: "", quantity: "" },
    ]);
  };

  const removeVariant = (id) => {
    setVariants((prev) => prev.filter((variant) => variant._id !== id));
  };

  const updateVariant = (id, field, value) => {
   
    if (!/^\d*$/g.test(value)) { 
      return; 
    }
    setVariants((prev) =>
      prev.map((variant) =>
        variant._id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  return (
    <>
      <div className="w-full h-full overflow-y-scroll xl:p-10 ">
        <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Product name */}
                <div>
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Name
                  </label>
                  <input
                    id="productName"
                    type="text"
                    name="name"
                    value={productDetails?.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Brand
                  </label>
                  <select
                    id="brand"
                    className="uppercase w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    name="brand"
                    onChange={handleChange}
                    value={productDetails.brand}
                  >
                    <option value="">Select brand</option>
                    {
                         brands.map((brand)=>{
                          return (
                            <option key={brand._id} value={brand._id} className="uppercase">{brand.name}</option>
                          )
                         })
                    }
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  name="category"
                  onChange={handleChange}
                  value={productDetails.category}
                >
                  <option value="">Select category</option>
                  {categories.map(
                    (category) =>
                      !category.is_deleted && (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Variants
                  </h3>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Variant
                  </button>
                </div>

                <div className="space-y-4">
                  {variants.map((variant, index) => (
                    <div
                      key={variant._id}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 border rounded-lg relative"
                    >
                      <label htmlFor="weigth">
                        <span className="px-1 text-sm">Weight</span>
                        <input
                          type="text"
                          placeholder="Weight in grams"
                          value={variant.weight}
                          onChange={(e) =>
                            updateVariant(variant._id, "weight", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </label>
                      <label htmlFor="price">
                        <span className="px-1 text-sm">Price</span>
                        <input
                          type="number"
                          min={0}
                          placeholder="Price"
                          value={variant.price}
                          onChange={(e) =>
                            updateVariant(variant._id, "price", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </label>
                      <label htmlFor="quantity">
                        <span className="px-1  text-sm">Quantity</span>
                        <input
                          type="number"
                          placeholder="Quantity"
                          value={variant.quantity}
                          min={0}
                          onChange={(e) =>
                            updateVariant(
                              variant._id,
                              "quantity",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </label>
                      <div className="flex justify-end lg:justify-center items-center">
                        {variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeVariant(variant._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Upload Images
                </h3>
                <div className="flex flex-col gap-4">
                  <form id="image-rest">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={inputFileRef}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                    />
                  </form>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((image) => (
                      <div
                        key={image.id}
                        className="relative group aspect-square border rounded-lg overflow-hidden bg-gray-100"
                      >
                        <img
                          src={URL.createObjectURL(image.img)}
                          alt="Product preview"
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute right-2 top-2 flex gap-2">
                            <button
                              onClick={() => editCrop(image)}
                              className="p-1 bg-white rounded-full hover:bg-gray-200"
                            >
                              <Crop />
                            </button>
                            <button
                              onClick={() => removeImage(image.id)}
                              className="p-1 bg-white rounded-full hover:bg-gray-200"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    name="description"
                    onChange={handleChange}
                    value={productDetails.description}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product description"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="ingredients"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ingredients
                  </label>
                  <textarea
                    name="ingredients"
                    onChange={handleChange}
                    value={productDetails.ingredients}
                    id="ingredients"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter ingredients"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleSubmit}
                >
                  {submit_button_name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        children={
          <ImageCropper
            src={holdImage}
            onClose={onClose}
            setCroppedImage={setImages}
            id={editImageid}
            setId={setEditImageId}
          />
        }
      />
    </>
  );
};

export default AddEditForm;
