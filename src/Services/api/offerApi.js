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

export const deleteOffer = async (id) => {
    try {
        const res = await chocoriaBackEnd.delete(`/admin/offer/${id}`);
        return res;
    } catch (error) {
        return error;
    }
}

export const defaultReferralOffer = async () => {
    try {
        const res = await chocoriaBackEnd.get("/admin/default-referral-offer");
        return res;
    } catch (error) {
        return error;
    }
}

export const editDefaultReferralOffer = async (data) => {
    try {
        const res = await chocoriaBackEnd.patch("/admin/default-referral-offer",data);
        
        return res;
    } catch (error) {
        return error;
    }
}