import { OrderModel } from "../../../database/models/Order.model.js";

export const orderIsExist = async (orderId) => {
  return await OrderModel.findById(orderId);
};

export const createOrder = async (order) => {
  return await OrderModel.create(order);
};

export const getOrders = async () => {
  return await OrderModel.find();
};

export const getOrder = async (orderId) => {
  return await OrderModel.findById(orderId);
};

export const updateOrder = async (orderId, orderBody) => {
  return OrderModel.findByIdAndUpdate(orderId, orderBody, {
    new: true,
    runValidators: true,
  });
};

export const deleteOrder = async (orderId) => {
  return OrderModel.findByIdAndDelete(orderId);
};

export const updateOrderStatus = async (orderId, orderBody) => {
  return OrderModel.findByIdAndUpdate(orderId, orderBody, {
    new: true,
    runValidators: true,
  });
};
