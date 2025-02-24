import { chocoriaBackEnd } from "./api";


// get the wallet 

export const getWallet = async () => {
    try {
        const res = await chocoriaBackEnd.get("/user/wallet");
        return res;
    } catch (error) {
        return error;
    }
}