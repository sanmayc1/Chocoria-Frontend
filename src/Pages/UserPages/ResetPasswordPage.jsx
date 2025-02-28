import { useState } from "react";
import SingleInputField from "../../Components/HelperComponents/SingleInputField.jsx";
import { useNavigate, useParams } from "react-router-dom";
import yupSchema from "../../utils/yupSchema.jsx";
import { resetPassword } from "../../Services/api/userApi.js";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const { id } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await yupSchema.validateAt("password", { password: newPassword });
      if (newPassword !== confirmPassword) {
        setErr("Confirm Passwords not match");
        return;
      }
      setErr("");
      setIsLoading(true);
      const response = await resetPassword({ userId: id, password: newPassword });
      if (response.status !== 200) {
        setErr(response.response.data.message);
        setIsLoading(false);
        return;
      }
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      if(error?.response?.response?.data?.message){
        setErr(error.response.data.message);
        return;
      }
      setErr(error.message);
      return;
    }
    
  
  };

  return (
    <div className="flex justify-center h-screen items-center ">
      <div className="bg-white w-full max-w-md flex-col py-9 rounded-3xl shadow-lg m-3">
        <h4 className="text-2xl font-bold text-center pb-4">Reset Password</h4>
        <p className="text-center text-gray-500 pb-5"></p>
        <div className=" px-10 pb-5 ">
          <div className="pb-5">
            <SingleInputField
              noLimitWidth
              name="newPassword"
              placeholder="New Password"
              filedType={"password"}
              value={newPassword}
              handleChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <SingleInputField
            noLimitWidth
            name="confirmPassword"
            placeholder="Confirm Password"
            filedType={"password"}
            value={confirmPassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
          {err && <p className="text-red-500 text-xs pt-2 px-1 ">{err}</p>}
        </div>
        <div className="flex justify-center items-center w-full px-10 pb-5">
          <button
            className={`${
              isLoading ? "opacity-80 cursor-not-allowed" : ""
            } w-full bg-black text-white py-3 rounded-2xl flex justify-center  items-center`}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
