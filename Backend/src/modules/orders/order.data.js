import { OrderModel } from "../../../database/models/Order.model.js";

export const createOrder = async (order) => {
  return await OrderModel.create(order);
};

export const getOrders = async () => {
  return await OrderModel.find();
};

export const getOrder = async (orderId) => {
  return await OrderModel.findById(orderId);
};
