import * as service from "./order.service.js";

/* POST /orders */

export const createOrderService = async (payload) => {
  const { table, items } = payload;
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await orderDB.createOrderDB({ table, items, totalAmount });
  await orderDB.updateTableOrderDB(table, order._id);

  return await orderDB.getOrderByIdDB(order._id);
};

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

  // 🔥 هذا هو السطر الجوهري: يخبر المطبخ بوجود تحديث في الطلب
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

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  await service.deleteOrderService(id);
  res.json({
    success: true,
    message: "Order deleted successfully",
  });
};