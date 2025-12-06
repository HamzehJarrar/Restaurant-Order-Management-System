import * as orderService from "./order.service.js";

export const createOrder = async (req, res) => {
  const order = await orderService.createOrder(req.body);

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: order,
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
