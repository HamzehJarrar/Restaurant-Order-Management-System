import * as service from "./order.service.js";


export const getAllOrders = async (req, res) => {
  const orders = await service.getAllOrdersService();
  res.status(200).json({
    success: true,
    data: orders,
  });
};

export const addItemsToOrder = async (req, res) => {
  const { orderId, items } = req.body;
  const order = await service.addItemsToOrderService(orderId, items);

  req.io.emit("order:statusChanged", order); 

  res.status(200).json({
    success: true,
    data: order,
  });
};

/* GET /orders/table/:tableId */
export const getTableOrder = async (req, res) => {
  const { tableId } = req.params;

  const order = await service.getTableOrderService(tableId);

  res.json({
    success: true,
    data: order,
  });
};

/* PATCH /orders/:id */
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { items } = req.body;

  const order = await service.updateOrderService(id, items);

  req.io.emit("order:statusChanged", order);

  res.json({
    success: true,
    data: order,
  });
};

// order.controller.js
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const order = await service.updateOrderStatusService(id, status, notes);

  req.io.emit("order:statusChanged", order);

  res.json({
    success: true,
    data: order,
  });
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  await service.deleteOrderService(id);
  res.json({
    success: true,
    message: "Order deleted successfully",
  });
};