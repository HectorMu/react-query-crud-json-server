import axios from "axios";

const productsAPI = axios.create({
  baseURL: "http://localhost:3000/",
});

export const getProducts = async () => {
  const { data } = await productsAPI.get("/products");

  return data;
};

export const createProduct = async (product) =>
  await productsAPI.post("/products", product);

export const deleteProduct = async (id) =>
  await productsAPI.delete(`/products/${id}`);

export const getProduct = async (id) => {
  const { data } = await productsAPI.get(`/products/${id}`);
  return data;
};
