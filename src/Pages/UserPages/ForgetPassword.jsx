import { useState } from "react";
import SingleInputField from "../../Components/HelperComponents/InputFiled/SingleInputField.jsx";
import { forget_password } from "../../Services/api/userApi.js";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const[isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()

const handleSubmit = async (e) => {
  
  e.preventDefault();
  if (!email.trim()) {
    setErr("Please enter your email");
    return;
  }
  setErr("");
  setIsLoading(true)
  const response = await forget_password({ email });
  if (response.status !== 200) {
  
      setErr(response.response.data.message);
      setIsLoading(false)
      return;
    
  }
  setErr("");
  toast.success(response.data.message, {
    position: "top-center",
    autoClose: 2000,
    style: {width: "100%"}
  });
  setIsLoading(false)
  navigate("/login");
}

  return (
    <div className="flex justify-center h-screen items-center ">
      <div className="bg-white w-full max-w-md flex-col py-9 rounded-3xl shadow-lg m-3">
        <h4 className="text-2xl font-bold text-center pb-4">Forget Password</h4>
        <p className="text-center text-gray-500 pb-5">
          Enter your email address to reset your password
        </p>
        <div className=" px-10 pb-5">
          <SingleInputField
            noLimitWidth
            placeholder="Email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          {err && <p className="text-red-500 text-xs pt-2 px-1 ">{err}</p>}
        </div>
        <div className="flex justify-center items-center w-full px-10 pb-5">
          <button className={`${isLoading ? "opacity-80 cursor-not-allowed" : ""} w-full bg-black text-white py-3 rounded-2xl flex justify-center  items-center`} disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? <CircularProgress color="inherit" size={20} /> : "Send Reset Link"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
