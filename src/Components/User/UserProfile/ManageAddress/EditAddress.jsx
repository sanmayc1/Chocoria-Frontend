import { useEffect, useState } from "react";
import addressSchema from "../../../../utils/yupAddressSchema.jsx";
import AddressForm from "./AddressForm.jsx";
import {  get_address_by_id, update_address } from "../../../../Services/api/userApi.js";
import { toast } from "react-toastify";

const EditAddress = ({ closeModel ,update,setUpdate,selectedId}) => {
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

  useEffect(() => {
    async function fetchAddressData() {
      const response = await get_address_by_id(selectedId);
      if (response.status === 200) {
        setAddress(response.data.address);
        setSelectedAddressType(response.data.address.address_type);
        return;
      }
      toast.error(response.response.data.message, {
        position: "top-center",
      });
    }
    fetchAddressData();
  }, [selectedId]);

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
      const response = await update_address(data, selectedId);
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
       setUpdate(!update);
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
        title="Edit Address"
        btnName="Update Address"
      />
    </>
  );
};

export default EditAddress;
