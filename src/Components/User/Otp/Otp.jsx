import { useState, useEffect } from "react";
import SquareBlack from "../button/SquareBlack.jsx";
import Timer from "./Timer.jsx";

const Otp = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));

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

  useEffect(() => {});

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
          <SquareBlack btnName={"Confirm"} />
        </div>
        {/* Timer */}
        <div className="flex justify-center pt-1">
          <Timer  />
        </div>
      </div>
    </>
  );
};

export default Otp;
