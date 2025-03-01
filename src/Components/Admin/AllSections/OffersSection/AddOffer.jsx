import { useState } from "react";
import OfferAddEditForm from "./OfferAddEdit.jsx";
import { toast } from "react-toastify";
import { addOffer } from "../../../../Services/api/offerApi.js";

const AddOffer = ({onClose,setUpdate}) => {
  const [offerData, setOfferData] = useState({
    offerTitle: "",
    percentage: "",
    expiryDate: "",
    applicableOn: "",
    specific: "",
  });

  const handleSubmit = async() => {
    for (let filed in offerData) {
      if (!offerData[filed].trim()) {
        toast.error("Please fill all the fields", {
          position: "top-center",
          autoClose: 1000,
          theme:"dark"
        });
        
        return;
      }
    }
    const response = await addOffer(offerData);
    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
      setUpdate((prev) => !prev);
      onClose();
      return;
    }

    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 1000,
      theme:"dark"
    });
    
  };
  return (
    <OfferAddEditForm
      offerData={offerData}
      setOfferData={setOfferData}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddOffer;
