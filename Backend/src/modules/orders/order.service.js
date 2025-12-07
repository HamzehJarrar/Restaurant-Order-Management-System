import * as OrderData from "./order.data.js";
import { AppError } from "../../utils/AppError.js";

export const createOrder = async (orderBody) => {
  if (!orderBody.tableNumber || !orderBody.items?.length) {
    throw new AppError(400, "Missing order fields");
  }
  orderBody.totalAmount = orderBody.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return await OrderData.createOrder(orderBody);
};

export const getOrders = async () => {
  return await OrderData.getOrders();
};

export const getOrder = async (orderId) => {
  return await OrderData.getOrder(orderId);
};

export const updateOrder = async (orderId, orderBody) => {
  return await OrderData.updateOrder(orderId, orderBody);
};

export const deleteOrder = async (orderId) => {
  return await OrderData.deleteOrder(orderId);
};

export const updateOrderStatus = async (orderId, orderBody) => {
  const order = await OrderData.orderIsExist(orderId);
  if (!order) {
    throw new AppError(404, "Order not found");
  }
  return await OrderData.updateOrderStatus(orderId, orderBody);
};