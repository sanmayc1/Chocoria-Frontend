import { useState } from "react";
import CommonBtn from "../button/CommonBtn.jsx";
import SingleInputField from "../../HelperComponents/InputFiled/SingleInputField.jsx";
import yupSchema from "../../../utils/yupSchema.jsx";
import { sign_up } from "../../../Services/api/api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUpFields = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState({});
  const navigate = useNavigate()

  //   handle changes
  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
    }
    const updateData = { ...formData, [name]: value };
    setFormData(updateData);
    try {
      await yupSchema.validateAt(name, updateData);
      setErr((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      setErr((prev) => ({ ...prev, [name]: error.message }));
    }
  };

  // handle submit

  const handeSubmit = async (e) => {
    e.preventDefault();
    try {
      // on submit validation
      await yupSchema.validate(formData, { abortEarly: false });
      setErr({});
      //  if validation is verified send data to backend
      const response = await sign_up(formData);

      if (response.status !== 200) {
        if (response.response.data?.validationErr) {
          setErr(response.response.data.validationErr);
          return;
        }
        if (response.status === 409) {
          setErr({ email: response.response.data.message });
          return;
        }

        toast.error(response?.response.data.message, {
          position: "top-center",
        });
        return;
      }

      navigate(`/otp/${response.data.id}`)

    } catch (error) {
      const validationErr = {};
      error?.inner.forEach((err) => {
        const { path, message } = err;
        validationErr[path] = message;
      });
      setErr(validationErr);
      
    }
  };
  return (
    <form className="w-full px-4" onSubmit={handeSubmit}>
      <div className="space-y-3 w-full">
        {/* Name */}
        <SingleInputField
          placeholder={"Full Name"}
          value={formData.username}
          handleChange={handleChange}
          name={"username"}
        />
        {err.username && (
          <span className="text-xs text-red-500 sm:px-14 px-10 ">
            {err.username}
          </span>
        )}
        {/* Phone */}
        <SingleInputField
          placeholder={"Phone Number"}
          value={formData.phone}
          handleChange={handleChange}
          name={"phone"}
        />
        {err.phone && (
          <span className="text-xs text-red-500 sm:px-14 px-10">
            {err.phone}
          </span>
        )}
        {/* Email */}
        <SingleInputField
          placeholder={"Email address"}
          value={formData.email}
          handleChange={handleChange}
          name={"email"}
        />
        {err.email && (
          <span className="text-xs text-red-500 sm:px-14 px-10 ">
            {err.email}
          </span>
        )}
        {/* Password */}
        <SingleInputField
          placeholder={"Password"}
          value={formData.password}
          filedType={"password"}
          handleChange={handleChange}
          name={"password"}
        />
        {err.password && (
          <span className="text-xs text-red-500 sm:px-14 px-10">
            {err.password}
          </span>
        )}
        {/* confirm password */}
        <SingleInputField
          placeholder={"Confirm Password"}
          value={formData.confirmPassword}
          handleChange={handleChange}
          filedType={"password"}
          name={"confirmPassword"}
        />
        <span className="text-xs text-red-500 sm:px-14 px-10">
          {err.confirmPassword}
        </span>
      </div>

      {/* Sign Up button */}
      <div className="w-full flex justify-center py-6">
        <CommonBtn btnName={"SIGN UP"} />
      </div>
    </form>
  );
};
export default SignUpFields;
