import { useState, useEffect } from "react";
import SquareBlack from "../button/SquareBlack.jsx";
import Timer from "./Timer.jsx";
import { otp_verify } from "../../../Services/api/api.js";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Otp = ({id}) => {
  const [otp, setOtp] = useState(Array(4).fill(""));
 const navigate = useNavigate()
  // handle the input filed changes
  const handleChange = (e, index) => {
    const value = e.target.value;

    //  only numbers are allow
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    //  change focus to next field
    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handleSubmit = async()=>{
    const otpJoin = otp.join('')
    const response = await otp_verify({id,otp:otpJoin})
    if(response.status !== 200){
      toast.error(response.response.data.message,{position:"top-center"})
      return
    }
    toast.success(response.data.message,{position:"top-center",autoClose:1000})
    setTimeout(()=>{
      navigate('/login')
    },2500)
    
    


  }

  return (
    <>
      <div className="bg-white w-full max-w-md pt-6 rounded-3xl shadow-lg p-12">
        <h4 className="text-4xl font-bold text-center">Enter the OTP</h4>
        <p className="text-center p-7 text-gray-500 font-semibold text-sm">
          The OTP was sent to your registered email Please check the spam
          folder.
        </p>
        <div className="flex space-x-5 w-full justify-center ">
          {otp.map((value, index) => {
            return (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-10 h-10 text-center border-2 border-black  focus:outline-none focus:border-blue-500 text-lg"
                value={value}
                onChange={(e) => handleChange(e, index)}
              />
            );
          })}
        </div>
        <div className="w-full flex justify-center pt-7 pb-2">
          <SquareBlack btnName={"Confirm"} clickEvent={handleSubmit} />
        </div>
        {/* Timer */}
        <div className="flex justify-center pt-1">
          <Timer id={id}  />
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Otp;
