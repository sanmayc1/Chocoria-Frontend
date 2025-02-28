import { chocoriaBackEnd } from "./api.js";


export const addOffer = async (data) => {
    try {
        const res = await chocoriaBackEnd.post("/admin/offer", data);
        return res;
    } catch (error) {
        return error;
    }
};

export const getAllOffers = async () => {
    try {
        const res = await chocoriaBackEnd.get("/admin/offers");
        return res;
    } catch (error) {
        return error;
    }
};