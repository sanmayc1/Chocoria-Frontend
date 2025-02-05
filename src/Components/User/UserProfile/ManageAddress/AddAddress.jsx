import { useState } from "react";
import addressSchema from "../../../../utils/yupAddressSchema.jsx";
import AddressForm from "./AddressForm.jsx";
import { add_address } from "../../../../Services/api/userApi.js";
import { toast } from "react-toastify";

const AddAddress = ({ closeModel, update, setUpdate,setCurrentPage }) => {
  const [errors, setErrors] = useState({});
  const [selectedAddressType, setSelectedAddressType] = useState("Home");
  const [address, setAddress] = useState({
    name: "",
    address: "",
    pincode: "",
    phone: "",
    city: "",
    state: "",
    landmark: "",
    detailed_address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addressSchema.validate(address, { abortEarly: false });
      setErrors({});
      const data = {
        ...address,
        address_type: selectedAddressType,
        pincode: parseInt(address.pincode),
      };
      const response = await add_address(data);
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
        setUpdate(!update);
        if(setCurrentPage){
          setCurrentPage(1);
        }
        closeModel();
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      if (error.inner) {
        setErrors(
          error.inner.reduce(
            (acc, err) => ({ ...acc, [err.path]: err.message }),
            {}
          )
        );
      }
      return;
    }
  };
  return (
    <>
      <AddressForm
        errors={errors}
        setErrors={setErrors}
        handleSubmit={handleSubmit}
        selectedAddressType={selectedAddressType}
        setSelectedAddressType={setSelectedAddressType}
        address={address}
        setAddress={setAddress}
        title="Add New Address"
        btnName="Add Address"
      />
    </>
  );
};

export default AddAddress;
