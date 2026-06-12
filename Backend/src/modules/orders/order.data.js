import { OrderModel } from "../../../database/models/Order.model.js";
import { TableModel } from "../../../database/models/table.model.js";

export const createOrderDB = (data) => {
  return OrderModel.create({ status: "pending", ...data });
};

export const getAllOrdersDB = () => {
  return OrderModel.find({ 
    status: { $in: ["pending", "OPEN", "cooking", "ready", "paid"] } 
  }).populate("table").populate("items.menuItemId");
};

export const updateOrderStatusDB = (id, status) => {
  return OrderModel.findByIdAndUpdate(id, { status }, { new: true });
};

export const getOrderByTableDB = (tableId) => {
  return OrderModel.findOne({ 
    table: tableId, 
    status: { $nin: ["served", "paid"] }
  })
    .populate("table")
    .populate("items.menuItemId");
};

export const getOrderByIdDB = (id) => {
  return OrderModel.findById(id).populate("table").populate("items.menuItemId");
};

export const updateOrderDB = (id, data) => {
  return OrderModel.findByIdAndUpdate(id, data, { new: true })
    .populate("table")
    .populate("items.menuItemId");
};

export const updateTableOrderDB = (tableId, orderId) => {
  return TableModel.findByIdAndUpdate(
    tableId,
    { currentOrder: orderId, status: "occupied" },
    { new: true }
  );
};

export const deleteOrderDB = (id) => {
  return OrderModel.findByIdAndDelete(id);
};
