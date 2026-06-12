import { api } from "./axios";

// Returns { success, data: orders[] }
export const getAllOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

// Returns the order object (creates one if none exists for the table)
export const getOrderByTable = async (tableId) => {
  const { data } = await api.get(`/orders/table/${tableId}`);
  return data.data;
};

// Add items to the table's current order
export const addItemsToOrder = async ({ tableId, items }) => {
  const order = await getOrderByTable(tableId);
  const { data } = await api.post("/orders/add-items", {
    orderId: order._id,
    items,
  });
  return data.data;
};

// Update order items (quantity changes / removals)
export const updateOrder = async (orderId, { items }) => {
  const { data } = await api.patch(`/orders/${orderId}`, { items });
  return data.data;
};

// Update order status (pending → OPEN → cooking → ready → paid)
export const updateStatus = async (orderId, { status, notes }) => {
  const { data } = await api.patch(`/orders/${orderId}/status`, { status, notes });
  return data.data;
};

// Delete an order
export const deleteOrder = async (orderId) => {
  const { data } = await api.delete(`/orders/${orderId}`);
  return data;
};
