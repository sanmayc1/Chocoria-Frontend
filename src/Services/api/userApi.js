import { chocoriaBackEnd } from "./api.js"


// user profile update
export const updateUserProfile = async (data) => {
    try {
        const res = await chocoriaBackEnd.patch("/user/update-profile",data)
        return res;
    } catch (error) {
        return error;
    }
}

// add new address
export const addUserAddress = async (data)=>{
  
    try {
        const res = await chocoriaBackEnd.post("/user/address",data)
        return res;
    } catch (error) {
        return error;
    }
}

// get all user address

export const getAllAddressOfUser = async ()=>{
    try {
        const res = await chocoriaBackEnd.get("/user/address")
        return res;
    } catch (error) {
        return error;
    }
}

// delete address
export const deleteUserAddress = async (id)=>{
    try {
        const res = await chocoriaBackEnd.delete(`/user/address/${id}`)
        return res;
    } catch (error) {
        return error;
    }
}

// update address 

export const updateUserAddress = async (data,id)=>{
    try {
        const res = await chocoriaBackEnd.patch(`/user/address/${id}`,data)
        return res;
    } catch (error) {
        return error;
    }
}

// set default address 

export const setDefaultAddress = async (id)=>{
    try {
        const res = await chocoriaBackEnd.patch(`/user/address/${id}/default`)
        return res;
    } catch (error) {
        return error;
    }
}


// get address by id
export const getFullAddressById = async (id)=>{
    try {
        const res = await chocoriaBackEnd.get(`/user/address/${id}`)
        return res;
    } catch (error) {
        return error;
    }
}

// forget password
export const forgetUserPassword = async (data)=>{
    try {
        const res = await chocoriaBackEnd.post("/user/forget-password",data)
        return res;
    } catch (error) {
        return error;
    }
}
// reset password
export const resetPassword = async (data)=>{
    try {
        const res = await chocoriaBackEnd.patch("/user/reset-password",data)
        return res;
    } catch (error) {
        return error;
    }
}

export const getReferalUrl = async () =>{
    try {
        const res = await chocoriaBackEnd.get(`/user/referral`)
        return res;
    } catch (error) {
        return error;
    }
}