import React from "react";
import { FcGoogle } from "react-icons/fc";
import CommonBtn from "../button/CommonBtn.jsx";

const CommonForm = ({ heading, pageName, fields }) => {
  return (
    <div className="bg-white w-full max-w-md flex-col pt-6 rounded-3xl shadow-lg m-3">
      {/* Welcome Heading */}
      <div className="w-full flex justify-center">
        <h1 className="font-bold text-xl sm:text-2xl">{heading}</h1>
      </div>

      {/* Google SignIn */}
      <div className="w-full flex justify-center py-6 px-4">
        <CommonBtn
          btnName={
            <>
              <FcGoogle />
              <span className="text-white text-sm pl-3">
                Continue With Google
              </span>
            </>
          }
        />
      </div>

      <p className="text-xs font-semibold text-gray-400 text-center pb-6">
        {`OR ${pageName} WITH EMAIL`}
      </p>
      {fields}

      {pageName === "LOG IN" ? (
        <p className="text-center pb-6">
          Don't Have an Account?{" "}
          <span className="text-blue-700 cursor-pointer">Sign Up</span>
        </p>
      ) : (
        <p className="text-center pb-6">
          Already Have an Account?{" "}
          <span className="text-blue-700 cursor-pointer">Sign In</span>
        </p>
      )}
    </div>
  );
};

export default CommonForm;
