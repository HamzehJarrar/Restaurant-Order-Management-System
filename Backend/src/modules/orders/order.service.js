import * as orderDB from "./order.data.js";

/* Create order */
export const createOrderService = async (payload) => {
  const { table, items } = payload;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await orderDB.createOrderDB({
    table,
    items,
    totalAmount,
  });

  await orderDB.updateTableOrderDB(table, order._id);

  return order;
};

/* Get current table order */
export const getTableOrderService = async (tableId) => {
  const order = await orderDB.getOrderByTableDB(tableId);
  return order;
};

/* Update order (add / edit items) */
export const updateOrderService = async (orderId, items) => {
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await orderDB.updateOrderDB(orderId, {
    items,
    totalAmount,
  });

  return order;
};

/* Update order status */
export const updateOrderStatusService = async (orderId, status) => {
  const order = await orderDB.updateOrderDB(orderId, { status });
  return order;
};
