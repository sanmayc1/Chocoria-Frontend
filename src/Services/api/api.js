import axios from "axios";
import { baseUrl } from "./constants.js";

const chocoriaBackEnd = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    const res = await chocoriaBackEnd.post("/user/auth/signup",data);
    return res;
  } catch (error) {
    return error;
  }
};

//Otp verify 

export const otp_verify = async (data) => {
  try {
    const res = await chocoriaBackEnd.patch("/user/otp",data);
    return res;
  } catch (error) {
    return error;
  }
};


//resend the otp 
export const resend_Otp = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("/user/resend-otp",data);
    return res;
  } catch (error) {
    return error;
  }
};