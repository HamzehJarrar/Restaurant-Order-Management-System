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
