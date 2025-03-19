import { chocoriaBackEnd } from "./api.js";

export const createBrand = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("/admin/brand", data,{
        headers:{
            "Content-Type":'multipart/form-data'
        }
    });
    return res;
  } catch (error) {
    return error;
  }
};


export const getAllBrands = async () => {
    try {
      const res = await chocoriaBackEnd.get("/admin/brand");
      return res;
    } catch (error) {
      return error;
    }
  };


  export const deleteBrand = async (id) => {
    try {
      const res = await chocoriaBackEnd.delete(`/admin/brand/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  };