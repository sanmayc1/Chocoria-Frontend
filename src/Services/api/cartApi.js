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