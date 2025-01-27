import { chocoriaBackEnd } from "./api.js";

// fecth the users

export const fetch_users = async () => {
  try {
    const res = await chocoriaBackEnd.get("/admin/users");
    return res;
  } catch (error) {
    return error;
  }
};

// block the user

export const block_user = async (id) => {
  try {
    const res = await chocoriaBackEnd.patch(`/admin/block-user/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};


// delete the user

export const delete_user = async (id) => {
  try {
    const res = await chocoriaBackEnd.delete(`/admin/delete-user/${id}`);
    return res;
  } catch (error) {
    return error;
  }
}

