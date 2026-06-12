export const ordersByTable = new Map();

const STORAGE_KEY = "roms.orders";

const resolveTableNumber = (tableId) => {
  const match = String(tableId || "").match(/\d+$/);
  return match ? Number(match[0]) : null;
};

const loadOrdersFromStorage = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch (error) {
    console.warn("Failed to load orders from storage:", error);
    return null;
  }
};

const persistOrders = () => {
  if (typeof window === "undefined") return;
  try {
    const payload = Array.from(ordersByTable.values());
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("Failed to persist orders:", error);
  }
};

const normalizeStoredOrder = (order) => {
  const tableId = order?.table?._id || order?.table || order?._id?.replace("order-", "");
  const tableNumber = order?.table?.number ?? resolveTableNumber(tableId);
  const items = Array.isArray(order?.items) ? order.items : [];
  const computedTotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );
  const createdAt = order?.createdAt || new Date().toISOString();
  const updatedAt = order?.updatedAt || createdAt;

  return {
    _id: order?._id || `order-${tableId}`,
    table: { _id: tableId, number: tableNumber },
    status: order?.status || "pending",
    items,
    totalAmount: Number(order?.totalAmount ?? computedTotal),
    notes: order?.notes || "",
    createdAt,
    updatedAt,
  };
};

const normalizeItems = (items = []) =>
  items.map((item) => ({
    _id: item._id || `order-item-${item.menuItemId}-${Date.now()}`,
    menuItemId: item.menuItemId || item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity || 1,
    image: item.image || "",
    notes: item.notes || "",
  }));

export const getOrderByTableLocal = (tableId) => {
  if (!ordersByTable.has(tableId)) {
    const tableNumber = resolveTableNumber(tableId);
    const now = new Date().toISOString();
    const newOrder = {
      _id: `order-${tableId}`,
      table: { _id: tableId, number: tableNumber },
      status: "pending",
      items: [],
      totalAmount: 0,
      notes: "",
      createdAt: now,
      updatedAt: now,
    };
    ordersByTable.set(tableId, newOrder);
  }
  return ordersByTable.get(tableId);
};

export const setOrderForTable = (tableId, order) => {
  ordersByTable.set(tableId, order);
  persistOrders();
};

export const addItemsToOrderLocal = (tableId, items) => {
  const order = getOrderByTableLocal(tableId);
  const updatedItems = [...order.items];
  const incomingItems = normalizeItems(items);

  incomingItems.forEach((incoming) => {
    const index = updatedItems.findIndex(
      (item) => item.menuItemId === incoming.menuItemId && item.notes === incoming.notes
    );

    if (index > -1) {
      updatedItems[index].quantity += incoming.quantity;
    } else {
      updatedItems.push(incoming);
    }
  });

  const totalAmount = updatedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const nextOrder = {
    ...order,
    items: updatedItems,
    totalAmount,
    updatedAt: new Date().toISOString(),
  };

  setOrderForTable(tableId, nextOrder);
  return nextOrder;
};

export const updateOrderItemsLocal = (tableId, items) => {
  const order = getOrderByTableLocal(tableId);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const nextOrder = {
    ...order,
    items,
    totalAmount,
    updatedAt: new Date().toISOString(),
  };

  setOrderForTable(tableId, nextOrder);
  return nextOrder;
};

export const updateOrderStatusLocal = (tableId, status, notes) => {
  const order = getOrderByTableLocal(tableId);
  const nextOrder = {
    ...order,
    status,
    notes: notes ?? order.notes,
    updatedAt: new Date().toISOString(),
  };
  setOrderForTable(tableId, nextOrder);
  return nextOrder;
};

export const deleteOrderLocal = (tableId) => {
  ordersByTable.delete(tableId);
  persistOrders();
};

export const getAllOrdersLocal = () => Array.from(ordersByTable.values());

const seedOrders = () => {
  if (ordersByTable.size > 0) return;
  const now = new Date();
  const tables = ["table-1", "table-2", "table-3", "table-4", "table-5", "table-6"]; 
  tables.forEach((tableId, index) => {
    const orderItems = index % 2 === 0
      ? [
          {
            _id: `order-item-${tableId}-1`,
            menuItemId: "menu-margherita-pizza",
            name: "Margherita Pizza",
            price: 45,
            quantity: 1 + (index % 2),
            image: "https://source.unsplash.com/800x600/?margherita-pizza",
            notes: "",
          },
          {
            _id: `order-item-${tableId}-2`,
            menuItemId: "menu-iced-coffee",
            name: "Iced Coffee",
            price: 18,
            quantity: 2,
            image: "https://source.unsplash.com/800x600/?iced-coffee",
            notes: "",
          },
        ]
      : [
          {
            _id: `order-item-${tableId}-1`,
            menuItemId: "menu-grilled-salmon",
            name: "Grilled Salmon",
            price: 68,
            quantity: 1,
            image: "https://source.unsplash.com/800x600/?grilled-salmon",
            notes: "",
          },
          {
            _id: `order-item-${tableId}-2`,
            menuItemId: "menu-lemonade",
            name: "Lemonade",
            price: 16,
            quantity: 1,
            image: "https://source.unsplash.com/800x600/?lemonade",
            notes: "",
          },
        ];
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const createdAt = new Date(now.getTime() - index * 1000 * 60 * 12).toISOString();
    const status = index < 3
      ? ["OPEN", "cooking", "ready"][index]
      : "paid";
    const order = {
      _id: `order-${tableId}`,
      table: { _id: tableId, number: resolveTableNumber(tableId) },
      status,
      items: orderItems,
      totalAmount,
      notes: index === 0 ? "No onions, extra sauce." : "",
      createdAt,
      updatedAt: createdAt,
    };
    ordersByTable.set(tableId, order);
  });
  persistOrders();
};

const storedOrders = loadOrdersFromStorage();
if (storedOrders?.length) {
  storedOrders.forEach((order) => {
    const normalized = normalizeStoredOrder(order);
    if (normalized?.table?._id) {
      ordersByTable.set(normalized.table._id, normalized);
    }
  });
} else {
  seedOrders();
}
