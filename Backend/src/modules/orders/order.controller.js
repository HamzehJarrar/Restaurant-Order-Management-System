import * as orderService from "./order.service.js";
import { AppError } from "../../utils/AppError.js";


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
    const {status} = req.body;
    const order = await orderService.updateOrderStatus(req.params.id, {status});
    res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: order,
    });
};