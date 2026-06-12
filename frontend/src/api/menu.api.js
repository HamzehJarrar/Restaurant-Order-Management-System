import { api } from "./axios";

export const getMenu = async () => {
  const { data } = await api.get("/menu");
  return data.data;
};

export const createItem = async (itemData) => {
  const form = new FormData();
  form.append("name", itemData.name);
  form.append("description", itemData.description || "");
  form.append("price", itemData.price);
  form.append("category", itemData.category || "");
  if (itemData.image instanceof File) {
    form.append("image", itemData.image);
  }
  const { data } = await api.post("/menu", form);
  return data.data;
};

export const getMenuItemById = async (id) => {
  const { data } = await api.get(`/menu/${id}`);
  return data.data;
};

export const updateItem = async (id, itemData) => {
  const form = new FormData();
  form.append("name", itemData.name);
  form.append("description", itemData.description || "");
  form.append("price", itemData.price);
  form.append("category", itemData.category || "");
  if (itemData.image instanceof File) {
    form.append("image", itemData.image);
  }
  const { data } = await api.patch(`/menu/${id}`, form);
  return data.data;
};

export const deleteItem = async (id) => {
  const { data } = await api.delete(`/menu/${id}`);
  return data;
};
