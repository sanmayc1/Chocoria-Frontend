import { Button, Pagination } from "@mui/material";
import Modal from "../../../HelperComponents/InputFiled/Modal";
import { useState } from "react";
import AddAddressForm from "./AddAddressForm";

const ManageAddress = () => {
   const [isOpen, setIsOpen] = useState(false);

   const closeModel = () => {
     setIsOpen(false);
     document.body.style.overflow = "auto";
   };

   const openModel = () => {
     setIsOpen(true);
     document.body.style.overflow = "hidden";
   };

  return (
    <>
      {/* Header Section */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
        {/* Title */}
        <h2 className="text-xl font-semibold">Manage Address</h2>

        {/* Add New Address Button */}
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#000" }}
          onClick={openModel}
        >
          Add New Address
        </Button>
      </div>

      {/* Address List Section */}
      <div className="w-full border border-gray-900 rounded-xl flex flex-col justify-between">
        {/* Address Item */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-gray-900">
          {/* Address Details */}
          <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
            <p className="text-sm font-medium">Name</p>
            <p className="text-sm">
              Address Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Illo, beatae.
            </p>
            <p className="text-sm">city state Pincode: 123456789,india</p>
            <p className="text-sm">phone number</p>
          </div>

          {/* Home or Office */}
          <div className="w-full sm:w-1/3 flex justify-start sm:justify-center items-center mb-4 sm:mb-0">
            <h1 className="text-sm font-medium">Home</h1>
          </div>

          {/* Edit and Delete Buttons */}
          <div className="w-full sm:w-1/3 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
            <Button color="inherit" variant="outlined" size="small">
              Edit
            </Button>
            <Button color="inherit" variant="outlined" size="small">
              Delete
            </Button>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center p-4">
          <Pagination count={10} />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={ closeModel} children={<AddAddressForm/>} />
    </>
  );
};

export default ManageAddress;