import { api } from "./axios";

export const getMenu = async (params = {}) => {
  const res = await api.get("/menu", { params });
  return res.data.data;
};

export const createItem = async (data) => {
  const res = await api.post("/menu", data);
  return res.data.data;
};

export const updateItem = async (id, data) => {
  const res = await api.patch(`/menu/${id}`, data);
  return res.data.data;
};

export const deleteItem = async (id) => {
  await api.delete(`/menu/${id}`);
};

export const getMenuItemById = async (id) => {
  const res = await api.get(`/menu/${id}`);
  return res.data.data;
};