import axios from "axios";

const API = "http://localhost:3000/api/orders";

export const getOrders = async () => {
  return await axios.get(API);
};

export const createOrder = async (data: any) => {
  return await axios.post(API, data);
};

export const updateOrderStatus = async (id: any, status: any) => {
  return await axios.patch(`${API}/${id}/status`, { status });
};
