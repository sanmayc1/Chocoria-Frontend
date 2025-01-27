import { chocoriaBackEnd } from "./api";

// fetch all category
export const get_categories = async () => {
  try {
    const res = await chocoriaBackEnd.get("/admin/category");
    return res;
  } catch (error) {
    return error;
  }
};

// add category

export const add_category = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("/admin/add-category", data);
    return res;
  } catch (error) {
    return error;
  }
};

// edit category

export const edit_categories = async (data) => {
  try {
    const res = await chocoriaBackEnd.patch("/admin/edit-category", data);
    return res;
  } catch (error) {
    return error;
  }
};

// delete category

export const delete_category = async (id) => {
  try {
    const res = await chocoriaBackEnd.delete(`/admin/delete-category/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

// disable category 
export const soft_delete_category = async (id) => {
  try {
    const res = await chocoriaBackEnd.patch("/admin/category/soft-delete",{id});
    return res;
  } catch (error) {
    return error;
  }
};
