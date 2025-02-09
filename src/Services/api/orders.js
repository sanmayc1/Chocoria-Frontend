import { chocoriaBackEnd } from "./api.js";



// place order  

export const place_order = async (data) => {
    try {
        const res = await chocoriaBackEnd.post("user/order",data);
        return res;
    } catch (error) {
        return error;
    }
}

// get the order details
export const get_orders = async () => {
    try {
        const res = await chocoriaBackEnd.get(`user/order`);
        return res;
    } catch (error) {
        return error;
    }
}

// get the order details

export const get_order_details = async (id) => {
    try {
        const res = await chocoriaBackEnd.get(`user/order/${id}`);
        return res;
    } catch (error) {
        return error;
    }
}

// get all orders for admin panel

export const get_all_orders = async () => {
    try {
        const res = await chocoriaBackEnd.get(`admin/orders`);
        return res;
    } catch (error) {
        return error;
    }
}