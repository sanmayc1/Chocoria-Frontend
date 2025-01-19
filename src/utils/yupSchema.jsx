import { object, ref, string } from "yup";

const yupSchema = object({
  fullName: string()
    .trim()
    .min(2, "Enter a valid name")
    .matches(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters")
    .required("Name is required"),
  phone: string()
    .matches(/^[987]\d{9}$/, "Enter a valid phone number")
    .required("Phone Number is required"),
  email: string().required("Email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Enter a valid email"),
  password: string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must have a letter, number, & symbol"
    )
    .min(8,"Minimum 8 Characters")
    .required("Password is required"),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password"), null], "Passwords not match"),
});

export default yupSchema;
