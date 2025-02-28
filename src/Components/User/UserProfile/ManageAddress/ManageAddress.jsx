import { Button, Pagination } from "@mui/material";
import Modal from "../../../HelperComponents/Modal.jsx";
import { useEffect, useState } from "react";
import {
  delete_address,
  get_all_address,
} from "../../../../Services/api/userApi.js";
import { toast } from "react-toastify";
import DeleteDailog from "../../../HelperComponents/DeleteDailog.jsx";
import AddAddress from "./AddAddress.jsx";
import EditAddress from "./EditAddress.jsx";

const ManageAddress = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  // fetch the address data
  useEffect(() => {
    async function fetchAddressData() {
      const response = await get_all_address();
      if (response.status === 200) {
        const startIndex = (currentPage - 1) * 2;
        const endIndex = startIndex + 2;
        const data = response.data.addresses;
        const pageCount = Math.ceil(data.length / 2);
        if (pageCount < currentPage) {
          setCurrentPage(pageCount);
          
        }
         
          setPageCount(pageCount); // Calculate the total number of pages
          setAddresses(data.slice(startIndex, endIndex));
          return;
        
      }
      toast.error(response.response.data.message, {
        position: "top-center",
      });
    }
    fetchAddressData();
  }, [update, currentPage]);

  //add address modal open
  const closeModel = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };
  // add address modal open
  const openModel = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  // edit address modal open
  const openEditModel = (id) => {
    setSelectedId(id);
    setOpenEdit(true);
  };
  // edit address modal close
  const closeEditModel = () => {
    setOpenEdit(false);
    setSelectedId("");
  };

  // modal open for delete
  const openDeleteModel = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };
  // modal close for delete
  const closeDeleteModel = () => {
    setOpenDelete(false);
    setSelectedId("");
  };

  // handle delete address

  const handleDelete = async () => {
    const response = await delete_address(selectedId);
    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      setUpdate(!update);
      closeDeleteModel();
      return;
    }
    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 1000,
    });
    return;
  };
  // handle page change
  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      {/* Header Section */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
        {/* Title */}
        <h2 className="text-xl font-semibold">Saved Address</h2>

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
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-gray-900"
            >
              {/* Address Details */}
              <div className="w-full sm:w-2/4 mb-4 sm:mb-0">
                <p className="text-sm font-medium">{address.name}</p>
                <p className="text-sm">{address.detailed_address}</p>
                <p className="text-sm">{`${address.city} ${address.state} ${address.pincode} `}</p>
                <p className="text-sm">{address.landmark}</p>
                <p className="text-sm">{`Phone : ${address.phone}`}</p>
              </div>

              {/* Home or Office */}
              <div className="w-full sm:w-1/4 flex justify-start sm:justify-center items-center mb-4 sm:mb-0">
                <h1 className="text-sm font-medium">{address.address_type}</h1>
              </div>

              {/* Edit and Delete Buttons */}
              <div className="w-full sm:w-1/4 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
                <Button
                  color="inherit"
                  variant="outlined"
                  size="small"
                  onClick={() => openEditModel(address._id)}
                >
                  Edit
                </Button>
                <Button
                  color="inherit"
                  variant="outlined"
                  size="small"
                  onClick={() => openDeleteModel(address._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center p-4">
            No addresses found
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center p-4">
         
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
            />
         
        </div>
      </div>
      {/* Add Address Model */}
      <Modal
        isOpen={isOpen}
        onClose={closeModel}
        children={
          <AddAddress
            closeModel={closeModel}
            update={update}
            setUpdate={setUpdate}
            setCurrentPage={setCurrentPage}
          />
        }
      />
      {/* Edit Address Model */}
      <Modal
        isOpen={openEdit}
        onClose={closeEditModel}
        children={
          <EditAddress
            closeModel={closeEditModel}
            update={update}
            setUpdate={setUpdate}
            selectedId={selectedId}
          />
        }
      />

      {/* Delete Address Model */}
      <Modal
        isOpen={openDelete}
        onClose={closeDeleteModel}
        children={
          <DeleteDailog cancel={closeDeleteModel} title={"Delete Address"} confirm={handleDelete} message={`Are you sure you want to delete this address ?`} />
        }
      />
    </>
  );
};

export default ManageAddress;
