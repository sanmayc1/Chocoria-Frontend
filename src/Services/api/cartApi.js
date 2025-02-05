import { chocoriaBackEnd } from "./api.js";


// add to cart

export const add_to_cart = async (data) => {
    try {
        const res = await chocoriaBackEnd.post("/user/cart", data);
        return res;
    } catch (error) {
        return error;
    }
}

// get cart

export const get_cart = async () => {
    try {
        const res = await chocoriaBackEnd.get("/user/cart");
        return res;
    } catch (error) {
        return error;
    }
}

// product quantity update

export const update_quantity = async (data) => {
    try {
        const res = await chocoriaBackEnd.patch(`/user/cart`, data);
        return res;
    } catch (error) {
        return error;
    }
}

// product delete from cart 

export const delete_cart_item = async (id,variantId) => {
    try {
        const res = await chocoriaBackEnd.delete(`/user/cart?productId=${id}&variantId=${variantId}`);
        return res;
    } catch (error) {
        return error;
    }
}