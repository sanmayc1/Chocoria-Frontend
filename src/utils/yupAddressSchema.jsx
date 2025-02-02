import { object, string } from "yup";

const addressSchema = object({
  name: string()
    .min(2, "Name must be at least 2 characters") // Minimum length
    .max(50, "Name must be less than 50 characters") // Maximum length
    .required("* required"), // Name is required

  pincode: string()
    .matches(/^\d{6}$/, "Pincode must be 6 digits") // Must be exactly 6 digits
    .required("* required"), // Pincode is required

  phone: string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits") // Must be exactly 10 digits
    .required("* required"), // Phone number is required

  city: string()
    .min(2, "City must be at least 2 characters") // Minimum length
    .required("* required"), // City is required

  state: string()
    .min(2, "State must be at least 2 characters") // Minimum length
    .required("* required"), // State is required

  landmark: string()
    .notRequired() // Landmark is optional
    .max(100, "Landmark must be less than 100 characters"), // Maximum length

  detailed_address: string()
    .max(100, "Building name must be less than 100 characters") // Maximum length
    .required("* required"), // Building name is required
});

export default addressSchema;
