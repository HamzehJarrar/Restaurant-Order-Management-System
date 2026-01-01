// src/modules/orders/order.data.js
import { OrderModel } from "../../../database/models/Order.model.js";
import { TableModel } from "../../../database/models/table.model.js";


/* Create order */
export const createOrderDB = (data) => {
  return OrderModel.create(data);
};

export const getAllOrdersDB = () => {
  return OrderModel.find().populate("table");
};

export const updateOrderStatusDB = (id, status) => {
  return OrderModel.findByIdAndUpdate(id, { status }, { new: true });
}

/* Get order by table */
export const getOrderByTableDB = (tableId) => {
  return OrderModel.findOne({ table: tableId, status: { $ne: "served" } })
    .populate("table");
};

/* Get order by id */
export const getOrderByIdDB = (id) => {
  return OrderModel.findById(id);
};

/* Update order */
export const updateOrderDB = (id, data) => {
  return OrderModel.findByIdAndUpdate(id, data, { new: true });
};

/* Update table current order */
export const updateTableOrderDB = (tableId, orderId) => {
  return TableModel.findByIdAndUpdate(
    tableId,
    { currentOrder: orderId, status: "occupied" },
    { new: true }
  );
};
