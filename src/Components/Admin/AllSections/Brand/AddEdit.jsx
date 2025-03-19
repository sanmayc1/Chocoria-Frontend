import { useState } from "react";
import SingleInputField from "../../../HelperComponents/SingleInputField";
import { Button } from "@mui/material";

const BrandAddEdit = ({ title ,onClose ,image,setImage,brandName,setBrandName ,create}) => {
 
  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };
console.log(brandName);

  return (
    <>
      <h1 className="text-2xl font-semibold text-center pb-6">{title}</h1>
      <div className="space-y-4">
        <label htmlFor="brandname" className="flex flex-col gap-2 ">
          <span className="text-sm"> Brand Name</span>
          <SingleInputField noLimitWidth placeholder={"Brand Name"} value={brandName} handleChange={(e)=>setBrandName(e.target.value)} />
        </label>
        <p className="text-sm">Brand Logo</p>
        {!image ? (
          <div className="w-full h-28 border border-dashed border-black flex relative justify-center items-center">
            <input
              type="file"
              className="h-full w-full opacity-0 absolute"
              accept="image/*"
              value={image}
              onChange={handleChange}
            />
            <p>Upload Brand Logo</p>
          </div>
        ) : (
          <div className="h-[230px] w-[200px] overflow-hidden">
            <img
              src={URL.createObjectURL(image)}
              className="object-scale-down object-center w-[100%] h-[100%]"
              alt="preview"
            />
          </div>
        )}
     <div className="flex justify-end gap-3">
     <Button style={{ backgroundColor: "black", color: "white" }} onClick={onClose} >
          Cancel
        </Button>
        <Button style={{ backgroundColor: "black", color: "white" }} onClick={create} >
          Create
        </Button>
     </div>
      </div>
    </>
  );
};

export default BrandAddEdit;
