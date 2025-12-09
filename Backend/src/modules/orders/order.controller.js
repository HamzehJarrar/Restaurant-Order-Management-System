import * as orderService from "./order.service.js";

export const createOrder = async (req, res) => {
  const { tableNumber } = req.body;


  const table = await orderService.tableIsExist(tableNumber);

  if (!table) {
    return res.status(404).json({ success: false, message: "Table not found" });
  }

  if (table.currentOrder) {
    return res.status(400).json({
      success: false,
      message: "Table already has an active order",
      orderId: table.currentOrder,
    });
  }

  const newOrder = await orderService.createOrder({ tableNumber });

  table.status = "occupied";
  table.currentOrder = newOrder._id;
  await table.save();

  res.status(201).json({ success: true, data: newOrder });
};

// إضافة item على order
export const addItemToOrder = async (req, res) => {
  const { id } = req.params;
  const item = req.body;

  const updatedOrder = await orderService.addItemToOrder(id, item);

  res.status(200).json({
    success: true,
    message: "Item added successfully",
    data: updatedOrder,
  });
};

export const getOrders = async (req, res) => {
  const orders = await orderService.getOrders();

  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    data: orders,
  });
};

export const getOrder = async (req, res) => {
  const order = await orderService.getOrder(req.params.id);
  res.status(200).json({
    success: true,
    message: "Order retrieved successfully",
    data: order,
  });
};

export const updateOrder = async (req, res) => {
  const order = await orderService.updateOrder(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: order,
  });
};

export const deleteOrder = async (req, res) => {
  const order = await orderService.deleteOrder(req.params.id);

  if (!order) {
    return res.status(200).json({
      success: false,
      message: "Order already deleted or not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await orderService.updateOrderStatus(req.params.id, { status });
  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
};

export const payOrder = async (req, res) => {
  const order = await orderService.payOrderService(req.params.id);
  res.status(200).json({
    success: true,
    message: "Order paid successfully",
    data: order,
  });
};
