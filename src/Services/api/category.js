import { chocoriaBackEnd } from "./api.js";

// fetch all category
export const getCategories = async () => {
  try {
    const res = await chocoriaBackEnd.get("/admin/category");
    return res;
  } catch (error) {
    return error;
  }
};

// add category

export const addCategory = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("/admin/add-category", data);
    return res;
  } catch (error) {
    return error;
  }
};

// edit category

export const editCategories = async (data) => {
  try {
    const res = await chocoriaBackEnd.patch("/admin/edit-category", data);
    return res;
  } catch (error) {
    return error;
  }
};

// delete category

export const deleteCategory = async (id) => {
  try {
    const res = await chocoriaBackEnd.delete(`/admin/delete-category/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

// disable category 
export const categoryDisable = async (id) => {
  try {
    const res = await chocoriaBackEnd.patch("/admin/category/soft-delete",{id});
    return res;
  } catch (error) {
    return error;
  }
};

// get category

export const getCategoriesUserSide = async ()=>{
  try {
      const res = await chocoriaBackEnd.get("/user/categories")
      return res;
  } catch (error) {
      return error;
  }
}

// get top selling categories
 
export const getTopSellingCategories = async () => {
  try {
      const res = await chocoriaBackEnd.get("/admin//category/top-selling");
      return res;
  } catch (error) {
      return error;
  }
}