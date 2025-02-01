import { chocoriaBackEnd } from "./api.js"



export const update_profile = async (data) => {
    try {
        const res = await chocoriaBackEnd.patch("/user/update-profile",data)
        return res;
    } catch (error) {
        return error;
    }
}

