import { api } from "./axios";

export const getMenu = async (params = {}) => {
  const res = await api.get("/menu", { params });
  return res.data.data;
};

export const createMenuItem = async (data) => {
  const res = await api.post("/menu", data);
  return res.data.data;
};

export const updateMenuItem = async (id, data) => {
  const res = await api.patch(`/menu/${id}`, data);
  return res.data.data;
};

export const deleteMenuItem = async (id) => {
  await api.delete(`/menu/${id}`);
};
