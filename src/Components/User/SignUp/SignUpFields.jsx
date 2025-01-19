import { useState } from "react";
import CommonBtn from "../button/CommonBtn.jsx";
import SingleInputField from "../Common/SingleInputField.jsx";
import yupSchema from "../../../utils/yupSchema.jsx";

const SignUpFields = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState({});

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

  const handeSubmit = async(e) => {
    e.preventDefault();
    try {
        await yupSchema.validate(formData,{abortEarly:false})
    } catch (error) {
        console.log(error.inner[1].path)
    }
  };
  return (
    <form className="w-full px-4" onSubmit={handeSubmit}>
      <div className="space-y-3 w-full">
        {/* Name */}
        <SingleInputField
          placeholder={"Full Name"}
          value={formData.fullName}
          handleChange={handleChange}
          name={"fullName"}
        />
        {err.fullName && (
          <span className="text-xs text-red-500 px-14 ">{err.fullName}</span>
        )}
        {/* Phone */}
        <SingleInputField
          placeholder={"Phone Number"}
          value={formData.phone}
          handleChange={handleChange}
          name={"phone"}
        />
        {err.phone && (
          <span className="text-xs text-red-500 px-14 ">{err.phone}</span>
        )}
        {/* Email */}
        <SingleInputField
          placeholder={"Email address"}
          value={formData.email}
          handleChange={handleChange}
          name={"email"}
        />
        {err.email && (
          <span className="text-xs text-red-500 px-14 ">{err.email}</span>
        )}
        {/* Password */}
        <SingleInputField
          placeholder={"Password"}
          value={formData.password}
          handleChange={handleChange}
          name={"password"}
        />
        {err.password && (
          <span className="text-xs text-red-500 px-14">{err.password}</span>
        )}
        {/* confirm password */}
        <SingleInputField
          placeholder={"Confirm Password"}
          value={formData.confirmPassword}
          handleChange={handleChange}
          name={"confirmPassword"}
        />
        <span className="text-xs text-red-500 px-14">
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
