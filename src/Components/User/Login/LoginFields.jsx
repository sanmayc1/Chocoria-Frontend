import { useEffect, useState } from "react";
import CommonBtn from "../button/CommonBtn.jsx";
import SingleInputField from "../Common/SingleInputField.jsx";

const LoginFields = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // handle change of input filed
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="w-full px-4">
      <div className="space-y-4 w-full">
        {/* Email */}
        <SingleInputField
          placeholder={"Email Address"}
          value={formData.email}
          handleChange={handleChange}
          name={"email"}
        />
        {/* Password */}
        <SingleInputField
          placeholder={"Password"}
          value={formData.password}
          handleChange={handleChange}
          name={"password"}
        />
      </div>
      {/* forget password */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-xs">
          <p className="text-end text-xs font-semibold pt-3 hover:text-gray-600 cursor-pointer">
            Forget Password?
          </p>
        </div>
      </div>
      {/* login button */}
      <div className="w-full flex justify-center py-6">
        <CommonBtn btnName={"LOG IN"} />
      </div>
    </form>
  );
};
export default LoginFields;
