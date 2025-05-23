import React, { useState } from "react";
import CommonBtn from "../../User/button/CommonBtn.jsx";
import { useNavigate } from "react-router-dom";
import SingleInputField from "../../HelperComponents/SingleInputField.jsx";
import { adminLogin } from "../../../Services/api/api.js";
import { useDispatch } from "react-redux";
import { SET_AUTH } from "../../../Store/Slice/authSlice.jsx";
import { CircularProgress } from "@mui/material";
const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email.trim() || !formData.password.trim()) {
      setErr("Please fill all the fields");
      setLoading(false)
      return;
    }
    setErr("");
    // send data to backend
    setLoading(true);
    const response = await adminLogin(formData);
    if (response.status === 200) {
      dispatch(SET_AUTH(response.data));
      navigate("/admin/dashboard");
      setLoading(false);
      // navigate('/admin/dashboard')
    }

    if (response.status === 401) {
      setErr(response.response.data.message);
      setLoading(false)
    }
    if (response.status === 500) {
      setErr("Something went wrong");
      setLoading(false)
    }
    setLoading(false)
  };

  return (
    <div className="bg-white w-full max-w-md flex-col pt-6 rounded-3xl shadow-lg m-3">
      {/* Welcome Heading */}
      <div className="w-full flex justify-center mt-4">
        <img src="/adminSidelogo.png" className="w-60" alt="" />
      </div>

      {/* fields */}
      <div className="pt-12 space-y-4">
        <div className="flex justify-center ">
          <SingleInputField
            name={"email"}
            placeholder={"Email"}
            handleChange={handleChange}
          />
        </div>
        <div className="flex justify-center">
          <SingleInputField
            name={"password"}
            handleChange={handleChange}
            placeholder={"Password"}
            value={formData.password}
            filedType={"password"}
          />
        </div>
      </div>
      {err && <p className="text-red-500 text-xs pl-16 ml-2 pt-1">{err}</p>}

      {/* Google SignIn */}
      <div className="w-full flex justify-center py-6 px-4 select-none">
        <CommonBtn
          btnName={
            !loading ? "Log In" : <CircularProgress color="inherit" size={20} />
          }
          clickEvent={handeSubmit}
        />
      </div>
    </div>
  );
};

export default AdminLogin;
