import { chocoriaBackEnd } from "./api.js";

// add or remove from whishlist

export const addOrRemoveFromWhishlist = async (data) => {
    try {
        const res = await chocoriaBackEnd.post("/user/wishlist", data);
        return res;
    } catch (error) {
        return error;
    }
}

// get all the wishlist items

export const getWishlist = async () => {
    try {
        const res = await chocoriaBackEnd.get("/user/wishlist");
        return res;
    } catch (error) {
        return error;
    }
}

// wishlist remove
export const removeWishlistItem = async (id) => {
    try {
        const res = await chocoriaBackEnd.patch(`/user/wishlist/${id}`);
        return res;
    } catch (error) {
        return error;
    }
}
// check if the item is in wishlist
export const checkIfItemIsInWishlist = async (productId,variantId) => {
    try {
        const res = await chocoriaBackEnd.get(`/user/wishlist/${productId}/${variantId}`);
        return res;
    } catch (error) {
        return error;
    }
}