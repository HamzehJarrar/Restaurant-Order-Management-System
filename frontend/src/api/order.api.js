import { api } from "./axios";

export const createOrder = async (data) => {
  const res = await api.post("/orders", data);
  return res.data.data;
};

export const addItemsToOrder = async (data) => {
  const res = await api.post("/orders/add-items", data);
  return res.data.data;
}

export const getOrderByTable = async (tableId) => {
  const res = await api.get(`/orders/table/${tableId}`);
  return res.data.data;
};

export const updateOrder = async (orderId, data) => {
  const res = await api.patch(`/orders/${orderId}`, data);
  return res.data.data;
};
export const getAllOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

export const updateStatus = async (orderId, status) => {
  const res = await api.patch(`/orders/${orderId}/status`, { status });
  return res.data.data;
};

export const deleteOrder = async (orderId) => {
  const res = await api.delete(`/orders/${orderId}`);
  return res.data.data;
};