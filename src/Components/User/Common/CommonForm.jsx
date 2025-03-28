import React from "react";
import { FcGoogle } from "react-icons/fc";
import CommonBtn from "../button/CommonBtn.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../../Services/api/api.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SET_AUTH } from "../../../Store/Slice/authSlice.jsx";

const CommonForm = ({ heading, pageName, fields }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const referral = searchParams.get("referral") || "";

  const signInOrSignOut = () => {
    if (pageName === "LOG IN") {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  const redirectToHome = () => {
    navigate("/");
  };

  // google login get the access token

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await googleAuth({
          accessToken: tokenResponse.access_token,
          referral,
        });
        if (response.status === 200) {
          dispatch(SET_AUTH(response.data));
          navigate("/");
          return;
        } else {
          toast.error(response.response.data.message, {
            position: "top-center",
            autoClose: 2000,
            style: { width: "100%" },
          });
          return;
        }
      } catch (error) {
        toast.error("Something went wrong");
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
          <p className="text-center  select-none">
            Don't Have an Account?{" "}
            <span
              className="text-blue-700 cursor-pointer"
              onClick={signInOrSignOut}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-center  select-none">
            Already Have an Account?{" "}
            <span
              className="text-blue-700 cursor-pointer"
              onClick={signInOrSignOut}
            >
              Sign In
            </span>
          </p>
        )}
        <p
          className="text-center pb-6 pt-2 cursor-pointer text-sm font-semibold "
          onClick={redirectToHome}
        >
          Back to Home
        </p>
      </div>
    </>
  );
};

export default CommonForm;
