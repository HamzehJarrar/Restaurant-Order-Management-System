import * as orderDB from "./order.data.js";
import { MenuModel } from "../../../database/models/menu.model.js";

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
  let order = await orderDB.getOrderByTableDB(tableId);

  if (!order) {
    order = await orderDB.createOrderDB({
      table: tableId,
      items: [],
      totalAmount: 0,
      status: "OPEN",
    });

    await orderDB.updateTableOrderDB(tableId, order._id);
  }

  return order;
};

/* Add items to order */
export const addItemsToOrderService = async (orderId, newItems) => {
  const order = await orderDB.getOrderByIdDB(orderId);
  if (!order) throw new Error("Order not found");

  const updatedItems = [...order.items];

  for (const newItem of newItems) {
    const menuItem = await MenuModel.findById(newItem.menuItemId);
    if (!menuItem) continue;

    const index = updatedItems.findIndex(
      (item) =>
        item.menuItemId &&
        item.menuItemId.toString() === menuItem._id.toString()
    );

    if (index > -1) {
      updatedItems[index].quantity += newItem.quantity;
    } else {
      updatedItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: newItem.quantity,
      });
    }
  }
  const totalAmount = updatedItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );
  return await orderDB.updateOrderDB(orderId, {
    items: updatedItems,
    totalAmount,
  });
};

export const getAllOrdersService = async () => {
  const orders = await orderDB.getAllOrdersDB();
  return orders;
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
