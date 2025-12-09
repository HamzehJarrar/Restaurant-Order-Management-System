import * as OrderData from "./order.data.js";
import { AppError } from "../../utils/AppError.js";

export const createOrder = async (orderBody) => {
  if (!orderBody.tableNumber) {
    throw new AppError(400, "Table number is required");
  }

  const order = {
    tableNumber: orderBody.tableNumber,
    table: orderBody.tableNumber,
    items: [],
    status: "pending",
    totalAmount: 0,
  };

  return await OrderData.createOrder(order);
};

export const tableIsExist = async (tableNumber) => {
  return await OrderData.tableIsExist(tableNumber);
};

// إضافة item على order موجود
export const addItemToOrder = async (orderId, item) => {
  const order = await OrderData.getOrder(orderId);

  if (!order) {
    throw new AppError(404, "Order not found");
  }

  // نضيف الآيتم
  order.items.push(item);

  // نحسب totalAmount
  order.totalAmount = order.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  await order.save();
  return order;
};

export const payOrderService = async (orderId) => {
  return await OrderData.payOrderService(orderId);
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
