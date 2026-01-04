import * as orderDB from "./order.data.js";
import { MenuModel } from "../../../database/models/menu.model.js";

/* Get current table order */
export const getTableOrderService = async (tableId) => {
  let order = await orderDB.getOrderByTableDB(tableId);

  if (!order) {
    order = await orderDB.createOrderDB({
      table: tableId,
      items: [],
      totalAmount: 0,
      status: "pending",
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
        item.menuItemId?.toString() === menuItem._id.toString() &&
        item.notes === (newItem.notes || "")
    );

    if (index > -1) {
      updatedItems[index].quantity += newItem.quantity;
      updatedItems[index].image = menuItem.image || "";
    } else {
      updatedItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: newItem.quantity,
        image: menuItem.image || "",
        notes: newItem.notes || "",
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
// order.service.js
export const updateOrderStatusService = async (orderId, status, notes) => {
  const updateData = { status };
  if (notes !== undefined) updateData.notes = notes;

  const order = await orderDB.updateOrderDB(orderId, updateData);
  return order;
};

export const deleteOrderService = async (orderId) => {
  await orderDB.deleteOrderDB(orderId , {status: 'pending'});
};