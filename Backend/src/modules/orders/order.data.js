// src/modules/orders/order.data.js
import { OrderModel } from "../../../database/models/Order.model.js";
import { TableModel } from "../../../database/models/table.model.js";

export const orderIsExist = async (orderId) => {
  return await OrderModel.findById(orderId);
};

export const tableIsExist = async (tableNumber) => {
  return await TableModel.findOne({ number: tableNumber });
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
  return await OrderModel.findByIdAndUpdate(orderId, orderBody, {
    new: true,
    runValidators: true,
  });
};

export const deleteOrder = async (orderId) => {
  return await OrderModel.findByIdAndDelete(orderId);
};

export const updateOrderStatus = async (orderId, orderBody) => {
  return await OrderModel.findByIdAndUpdate(orderId, orderBody, {
    new: true,
    runValidators: true,
  });
};

export const payOrderService = async (orderId) => {
  const order = await OrderModel.findById(orderId);
  if (!order) throw new Error("Order not found");

  order.status = "completed";
  await order.save();

  const table = await TableModel.findOne({ number: order.tableNumber });

  if (table) {
    table.status = "available";
    table.currentOrder = null;
    await table.save();
  }

  return order;
};
