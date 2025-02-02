import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import SingleInputField from "../../../HelperComponents/InputFiled/SingleInputField.jsx";
import { useState } from "react";
import { Building, Home } from "lucide-react";
import { addressFetch } from "../../../../Services/api/thirdPartyApi.js";
import addressSchema from "../../../../utils/yupAddressSchema.jsx";
import { toast } from "react-toastify";
import { add_address } from "../../../../Services/api/userApi.js";


const AddressForm = ({errors,setErrors,handleSubmit,selectedAddressType,setSelectedAddressType,address,setAddress,title,btnName}) => {
  
  const [locationLoading, setLocationLoading] = useState(false);

  
  // Handle radio button change
  const handleChange = (event) => {
    setSelectedAddressType(event.target.value);
  };


  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "pincode") {
      if (!/^\d*$/.test(value)) return;
    }
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // fetch pincode and address data

  const fetchAddressData = async () => {
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await addressFetch( latitude, longitude );
      if (res.status === 200) {
        const { city, postcode, state, formatted,  street } =
          res.data.features[0].properties;
    
        setAddress((prev) => ({
          ...prev,
          city,
          pincode: postcode,
          state,
          detailed_address: formatted,
          landmark: street,
        }));
        setErrors((prev)=>({name:prev.name,phone:prev.phone }));
        setLocationLoading(false);
        return
      }
      
      
      toast.error("Something went wrong", {
        position: "top-center",
      });
      setLocationLoading(false);
    });
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">
        {title}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div>
            <SingleInputField
              placeholder={"Name"}
              noLimitWidth
              value={address.name || ""}
              handleChange={handleInputChange}
              name={"name"}
            />
            {errors.name && (
              <p className="text-red-500 text-xs px-1">{errors.name}</p>
            )}
          </div>
          <div>
            <SingleInputField
              placeholder={"Phone"}
              noLimitWidth
              value={address.phone || ""}
              handleChange={handleInputChange}
              name="phone"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs px-1">{errors.phone}</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <SingleInputField
                placeholder={"Pincode"}
                value={address.pincode || ""}
                handleChange={handleInputChange}
                name={"pincode"}
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs px-1">{errors.pincode}</p>
              )}
            </div>

            <button
              className="w-1/2 h-9 bg-black rounded-2xl box-border flex justify-center gap-0 sm:gap-3 items-center text-xs font-semibold text-white hover:bg-gray-800 transition-colors"
              onClick={fetchAddressData}
              disabled={locationLoading}
              type="button"
            >
              <GpsFixedIcon
                fontSize="small"
                className={`${locationLoading && "animate-spin"}`}
              />
              {locationLoading ? "" : "Use my location"}
            </button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <SingleInputField
                placeholder={"City"}
                noLimitWidth
                value={address.city || ""}
                handleChange={handleInputChange}
                name="city"
              />
              {errors.city && (
                <p className="text-red-500 text-xs px-1">{errors.city}</p>
              )}
            </div>
            <div>
              <SingleInputField
                placeholder={"State"}
                noLimitWidth
                value={address.state || ""}
                handleChange={handleInputChange}
                name="state"
              />
              {errors.state && (
                <p className="text-red-500 text-xs px-1">{errors.state}</p>
              )}
            </div>
          </div>
          <SingleInputField
            placeholder={"Landmark"}
            noLimitWidth
            value={address.landmark || ""}
            handleChange={handleInputChange}
            name="landmark"
          />
          <div>
            <SingleInputField
              placeholder={"House No. Building Name"}
              noLimitWidth
              value={address.detailed_address || ""}
              handleChange={handleInputChange}
              name="detailed_address"
            />
            {errors.detailed_address && (
              <p className="text-red-500 text-xs px-1">{errors.detailed_address}</p>
            )}
          </div>

          <div className="flex gap-2">
            {/* Home Option */}
            <label
              className={`flex items-center justify-center gap-1 h-7 px-2 border-2 rounded-2xl cursor-pointer transition-all ${
                selectedAddressType === "Home"
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-black"
              }`}
            >
              <input
                type="radio"
                name="addressType"
                value="Home"
                className="hidden"
                onChange={handleChange}
                checked={selectedAddressType === "Home"}
              />
              <Home className="w-4 h-4" /> 
              <span className="text-xs font-medium">Home</span>
            </label>

            {/* Office Option */}
            <label
              className={`flex items-center justify-center gap-1 h-7 px-2 border-2 rounded-2xl cursor-pointer transition-all ${
                selectedAddressType === "Office"
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-black"
              }`}
            >
              <input
                type="radio"
                name="addressType"
                value="Office"
                className="hidden"
                onChange={handleChange}
                checked={selectedAddressType === "Office"}
              />
              <Building className="w-4 h-4" /> 
              <span className="text-xs font-medium">Office</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full  h-9 bg-black rounded-2xl flex items-center justify-center text-white text-sm hover:bg-gray-800 transition-colors py-7 "
          >
            {btnName}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddressForm;
