import axios from "axios";
import { baseUrl } from "./constants.js";
import { auth_False } from "../../Store/Slice/authSlice.jsx";
import {store} from "../../Store/Store.jsx"
import { toast } from "react-toastify";
import { io } from "socket.io-client";
export const chocoriaBackEnd = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axios interceptor to token verfy to every request

chocoriaBackEnd.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.status === 403 &&
      (error.response.data.message === "Token Expired" ||
        error.response.data.message === "Unauthorized")
    ) {
      await user_logout();
      store.dispatch(auth_False());
      toast.error("Session Expired Please Login again",{position:"top-center"})
      io.disconnect();
      
     
     
    }
    return Promise.reject(error);
  }
);

// Google authentication retrived access token send to backend

export const googleAuth = async (accessToken) => {
  try {
    const res = await chocoriaBackEnd.post("/user/auth/google", {
      accessToken,
    });
    return res;
  } catch (error) {
    return error;
  }
};

// sign up with userinfo and password

export const sign_up = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("/user/auth/signup", data);
    return res;
  } catch (error) {
    return error;
  }
};

//Otp verify

export const otp_verify = async (data) => {
  try {
    const res = await chocoriaBackEnd.patch("/user/otp", data);
    return res;
  } catch (error) {
    return error;
  }
};

//resend the otp
export const resend_Otp = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("/user/resend-otp", data);
    return res;
  } catch (error) {
    return error;
  }
};

// login request

export const auth_login = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("/user/auth/login", data);
    return res;
  } catch (error) {
    return error;
  }
};

// logout request

export const user_logout = async () => {
  try {
    const res = await chocoriaBackEnd.post("/user/logout");
    return res;
  } catch (error) {
    return error;
  }
};

// get user details

export const get_user = async () => {
  try {
    const res = await chocoriaBackEnd.get("/user/profile");
    return res;
  } catch (error) {
    return error;
  }
};


// admin login

export const admin_login = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("/admin/auth/login", data);
    return res;
  } catch (error) {
    return error;
  }
}
