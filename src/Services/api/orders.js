import { chocoriaBackEnd } from "./api.js";

// place order

export const place_order = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("user/order", data);
    return res;
  } catch (error) {
    return error;
  }
};

// get the order details
export const get_orders = async () => {
  try {
    const res = await chocoriaBackEnd.get(`user/order`);
    return res;
  } catch (error) {
    return error;
  }
};

// get the order details

export const get_order_details = async (id) => {
  try {
    const res = await chocoriaBackEnd.get(`user/order/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

// get all orders for admin panel

export const get_all_orders = async () => {
  try {
    const res = await chocoriaBackEnd.get(`admin/orders`);
    return res;
  } catch (error) {
    return error;
  }
};

// admin side get the order details

export const adminGetOrderDetails = async (id) => {
  try {
    const res = await chocoriaBackEnd.get(`admin/orders/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

// admin side update the order status
export const adminUpdateOrderStatus = async (id, data) => {
  try {
    const res = await chocoriaBackEnd.patch(`admin/orders/${id}`, data);
    return res;
  } catch (error) {
    return error;
  }
};

// cancel the order
export const cancelOrder = async (id, data) => {
  try {
    const res = await chocoriaBackEnd.post(`/user/order/${id}/cancel`, data);
    return res;
  } catch (error) {
    return error;
  }
};

// get cancel request

export const getCancelRequest = async (id) => {
  try {
    const res = await chocoriaBackEnd.get(`/user/order/${id}/cancel`);
    return res;
  } catch (error) {
    return error;
  }
};

// get all cancel requests for admin
export const getAllCancelRequests = async () => {
  try {
    const res = await chocoriaBackEnd.get(`/admin/orders/cancel`);
    return res;
  } catch (error) {
    return error;
  }
};

// admin side order cancelation request update
export const updateCancelRequest = async (id, data) => {
  try {
    const res = await chocoriaBackEnd.patch(`/admin/orders/${id}/cancel`, data);
    return res;
  } catch (error) {
    return error;
  }
};

// verify payment

export const verifyPayment = async (data) => {
  try {
    const res = await chocoriaBackEnd.patch(`/user/order/payment/verify`, data);
    return res;
  } catch (error) {
    return error;
  }
};

// update order status

export const updateOrderStatus = async (data) => {
  try {
    const res = await chocoriaBackEnd.patch(`/user/order/status`, data);
    return res;
  } catch (error) {
    return error;
  }
};
// get all delivered orders

export const getDeliveredOrders = async () => {
  try {
    const res = await chocoriaBackEnd.get(`/admin/orders/delivered`);
    return res;
  } catch (error) {
    return error;
  }
};

// get total revenue

export const getTotalRevenue = async (selectedFilter) => {
  try {
    const res = await chocoriaBackEnd.get(
      `/admin/orders/revenue?filter=${selectedFilter}`
    );
    return res;
  } catch (error) {}
};

// get user order details

export const getUserOrderDetails = async (id) => {
  try {
    const res = await chocoriaBackEnd.get(`/user/order/details/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

// create a razorpay api

export const createRazorpayOrder = async (data) => {
  try {
    const res = await chocoriaBackEnd.post(`/user/order/razorpay`, data);
    return res;
  } catch (error) {
    return error;
  }
};

// retry payment verification

export const retryPaymentVerify = async (data) => {
  try {
    const res = await chocoriaBackEnd.patch(
      `/user/order/payment/verify/retry`,
      data
    );
    return res;
  } catch (error) {
    return error;
  }
};

// order Return

export const orderReturn = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("/user/order/return", data);
    return res;
  } catch (error) {
    return error;
  }
};
