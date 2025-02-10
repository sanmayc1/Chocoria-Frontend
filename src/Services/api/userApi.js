import { chocoriaBackEnd } from "./api.js"


// user profile update
export const update_profile = async (data) => {
    try {
        const res = await chocoriaBackEnd.patch("/user/update-profile",data)
        return res;
    } catch (error) {
        return error;
    }
}

// add new address
export const add_address = async (data)=>{
  
    try {
        const res = await chocoriaBackEnd.post("/user/address",data)
        return res;
    } catch (error) {
        return error;
    }
}

// get all user address

export const get_all_address = async ()=>{
    try {
        const res = await chocoriaBackEnd.get("/user/address")
        return res;
    } catch (error) {
        return error;
    }
}

// delete address
export const delete_address = async (id)=>{
    try {
        const res = await chocoriaBackEnd.delete(`/user/address/${id}`)
        return res;
    } catch (error) {
        return error;
    }
}

// update address 

export const update_address = async (data,id)=>{
    try {
        const res = await chocoriaBackEnd.patch(`/user/address/${id}`,data)
        return res;
    } catch (error) {
        return error;
    }
}


// get address by id
export const get_address_by_id = async (id)=>{
    try {
        const res = await chocoriaBackEnd.get(`/user/address/${id}`)
        return res;
    } catch (error) {
        return error;
    }
}

