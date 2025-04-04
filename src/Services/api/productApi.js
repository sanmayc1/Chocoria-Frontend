import { chocoriaBackEnd } from "./api.js";

// fetch all products

export const getAllProductsAdminSide = async () => {
  try {
    const res = await chocoriaBackEnd.get("/admin/products");
    return res;
  } catch (error) {
    return error;
  }
};

// add product
export const addProduct = async (data) => {
  try {
    const res = await chocoriaBackEnd.post("/admin/products", data, {
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
export const disableProduct = async (data) => {
  try {
    const res = await chocoriaBackEnd.patch(
      "/admin/products/soft-delete",
      data
    );
    return res;
  } catch (error) {
    return error;
  }
};

// delete product

export const deleteProduct = async (data) => {
  try {
    const res = await chocoriaBackEnd.delete(`/admin/products/${data}`);
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

export const getProductDetailsUserSide = async (id) => {
  try {
    const res = await chocoriaBackEnd.get(`/user/products/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const getProductDetailsAdminSide = async (id) => {
  try {
    const res = await chocoriaBackEnd.get(`/admin/products/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

// edit product

export const editProductDetails = async (data, id) => {
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
export const searchProduct = async (data, filterData) => {
  try {
    const res = await chocoriaBackEnd.get(
      `/user/products/search?searchQuery=${data}${
        filterData
          ? `&sortBy=${filterData.sortBy}&rating=${filterData.rating}&category=${filterData.category}&brand=${filterData.brand}`
          : ""
      }`
    );
    return res;
  } catch (error) {
    return error;
  }
};

// get top selling product

export const getTopSellingProduct = async () => {
  try {
    const res = await chocoriaBackEnd.get("/admin/products/top-selling");
    return res;
  } catch (error) {
    return error;
  }
};

// get Popular products

export const getPopularProducts = async () => {
  try {
    const res = await chocoriaBackEnd.get("/user/products/popular");
    return res;
  } catch (error) {
    return error;
  }
};

// treding products

export const getTrendingProducts = async () => {
  try {
    const res = await chocoriaBackEnd.get("/user/products/trending");
    return res;
  } catch (error) {
    return error;
  }
};

// get recommended products

export const getRecommendedProducts = async (id) => {
  try {
    const res = await chocoriaBackEnd.get(`/user/products/recommended/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
