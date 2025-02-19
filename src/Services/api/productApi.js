import { chocoriaBackEnd } from "./api.js";



// fetch all products 

export const get_product = async () => {
  try {
    const res = await chocoriaBackEnd.get("/admin/products");
    return res;
  } catch (error) {
    return error;
  }
};


// add product
export const add_product = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("/admin/products", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};
// soft delete 
export const soft_Delete_Product = async (data) => {
  try {
    const res = await chocoriaBackEnd.patch("/admin/products/soft-delete",data)
    return res;
  } catch (error) {
    return error;
  }
};

// delete product

export const delete_Product = async (data) => {
  try {
    const res = await chocoriaBackEnd.delete(`/admin/products/${data}`)
    return res;
  } catch (error) {
    return error;
  }
};


// user side all product fetch 

export const getProductsUser = async () => {
  try {
    const res = await chocoriaBackEnd.get("/user/products");
    return res;
  } catch (error) {
    return error;
  }
};

// one product details user side

export const get_product_user = async (id) => {
  try {
    const res = await chocoriaBackEnd.get(`/user/products/${id}`,);
    return res;
  } catch (error) {
    return error;
  }
};

export const get_product_details = async (id) => {
  try {
    const res = await chocoriaBackEnd.get(`/admin/products/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};


// edit product

export const edit_product = async (data,id) => {
  try {
    const res = await chocoriaBackEnd.patch(`/admin/products/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

// search product
export const searchProduct = async (data,filterData) => {
  try {
   
    const res = await chocoriaBackEnd.get(`/user/products/search?searchQuery=${data}${filterData?`&sortBy=${filterData.sortBy}&rating=${filterData.rating}&category=${filterData.category}`:""}`);
    return res;
  } catch (error) {
    return error;
  }
};