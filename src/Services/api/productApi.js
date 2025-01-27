import { chocoriaBackEnd } from "./api.js";


// add product
export const add_product = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("/admin/add-product", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

