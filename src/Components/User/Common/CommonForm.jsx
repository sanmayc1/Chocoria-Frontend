import React from "react";
import { FcGoogle } from "react-icons/fc";
import CommonBtn from "../button/CommonBtn.jsx";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../../Services/api/api.js";
import { toast, ToastContainer } from "react-toastify";

const CommonForm = ({ heading, pageName, fields }) => {
  const navigate = useNavigate();

  // sign in or signOut navigate

  const signInOrSignOut = () => {
    if (pageName === "LOG IN") {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  // google login get the access token

  const login = useGoogleLogin({

    onSuccess: async (tokenResponse) => {
      try {
        const response = await googleAuth(tokenResponse.access_token);
        if (response.data.success) {
          navigate("/");
        } else {
          toast.error(response.response.data.message, {
            position: "top-center",
          });
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error("Something went wrong")
      }
    },
    onError: (err) => console.error(err), 
  
  });

  return (
    <>
      <div className="bg-white w-full max-w-md flex-col pt-6 rounded-3xl shadow-lg m-3">
        {/* Welcome Heading */}
        <div className="w-full flex justify-center">
          <h1 className="font-bold text-xl sm:text-2xl">{heading}</h1>
        </div>

        {/* Google SignIn */}
        <div className="w-full flex justify-center py-6 px-4 select-none">
          <CommonBtn
            clickEvent={login}
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
          <p className="text-center pb-6 select-none">
            Don't Have an Account?{" "}
            <span
              className="text-blue-700 cursor-pointer"
              onClick={signInOrSignOut}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-center pb-6 select-none">
            Already Have an Account?{" "}
            <span
              className="text-blue-700 cursor-pointer"
              onClick={signInOrSignOut}
            >
              Sign In
            </span>
          </p>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default CommonForm;
