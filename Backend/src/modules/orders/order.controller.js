import * as service from "./order.service.js";

/* POST /orders */
export const createOrder = async (req, res) => {
  const order = await service.createOrderService(req.body);

  // Notify kitchen
  req.io.emit("order:new", order);

  res.status(201).json({
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

  res.json({
    success: true,
    data: order,
  });
};

/* PATCH /orders/:id/status */
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await service.updateOrderStatusService(id, status);

  // Notify waiter
  req.io.emit("order:statusChanged", order);

  res.json({
    success: true,
    data: order,
  });
};
