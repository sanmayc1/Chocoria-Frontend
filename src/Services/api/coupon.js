import { chocoriaBackEnd } from "./api.js";

export const addCoupon = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("/admin/coupon", data);
    return res;
  } catch (error) {
    return error;
  }
};

// get all coupons

export const getAllCoupons = async () => {
  try {
    const res = await chocoriaBackEnd.get("/admin/coupon");
    return res;
  } catch (error) {
    return error;
  }
};

// delete coupon
export const deleteCoupon = async (id) => {
  try {
    const res = await chocoriaBackEnd.delete(`/admin/coupon/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

// get user coupon

export const getUserCoupons = async () => {
  try {
    const res = await chocoriaBackEnd.get("/user/coupon");
    return res;
  } catch (error) {
    return error;
  }
};