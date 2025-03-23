import { chocoriaBackEnd } from "./api.js";


// add to cart

export const addToCart = async (data) => {
    try {
        const res = await chocoriaBackEnd.post("/user/cart", data);
        return res;
    } catch (error) {
        return error;
    }
}

// get cart

export const getCart = async () => {
    try {
        const res = await chocoriaBackEnd.get("/user/cart");
        return res;
    } catch (error) {
        return error;
    }
}

// product quantity update

export const updateQuantity = async (data) => {
    try {
        const res = await chocoriaBackEnd.patch(`/user/cart`, data);
        return res;
    } catch (error) {
        return error;
    }
}

// product delete from cart 

export const deleteItemFromCart = async (id,variantId) => {
    try {
        const res = await chocoriaBackEnd.delete(`/user/cart?productId=${id}&variantId=${variantId}`);
        return res;
    } catch (error) {
        return error;
    }
}