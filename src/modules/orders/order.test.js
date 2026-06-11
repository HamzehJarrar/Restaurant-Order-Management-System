import { describe, expect, jest } from "@jest/globals";

jest.unstable_mockModule("./order.data.js", () => ({
  getAllOrdersDB: jest.fn(),
  createOrderDB: jest.fn(),
  updateTableOrderDB: jest.fn(),
  getOrderByIdDB: jest.fn(),
  updateOrderDB: jest.fn(),
  deleteOrderDB: jest.fn(),
  getOrderByTableDB: jest.fn(),
}));

jest.unstable_mockModule("../../../database/models/menu.model.js", () => ({
  MenuModel: {
    findById: jest.fn(),
  },
}));

const orderData = await import("./order.data.js");
const orderService = await import("./order.service.js");
const { MenuModel } = await import("../../../database/models/menu.model.js");

describe("Order Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllOrdersService", () => {
    it("should fetch all orders", async () => {
      const mockOrders = [[{ id: 1, items: ["item1", "item2"], total: 100 }]];
      orderData.getAllOrdersDB.mockResolvedValue(mockOrders);
      const orders = await orderService.getAllOrdersService();
      expect(orders).toEqual(mockOrders);
      expect(orderData.getAllOrdersDB).toHaveBeenCalledTimes(1);
    });
  });

  describe("addItemsToOrderService", () => {
    it("should add new item to order", async () => {
      const mockOrder = {
        _id: "orderId",
        items: [],
      };

      orderData.getOrderByIdDB.mockResolvedValue(mockOrder);

      MenuModel.findById.mockResolvedValue({
        _id: "menu1",
        name: "Pizza",
        price: 10,
        image: "pizza.png",
      });

      orderData.updateOrderDB.mockResolvedValue({
        items: [
          {
            menuItemId: "menu1",
            name: "Pizza",
            price: 10,
            quantity: 2,
            image: "pizza.png",
            notes: "",
          },
        ],
        totalAmount: 20,
      });

      const result = await orderService.addItemsToOrderService("orderId", [
        { menuItemId: "menu1", quantity: 2 },
      ]);

      expect(MenuModel.findById).toHaveBeenCalledWith("menu1");
      expect(orderData.updateOrderDB).toHaveBeenCalled();
      expect(result.totalAmount).toBe(20);
    });
  });

  describe("getTableOrderService", () => {
    it("should return existing order if found", async () => {
      const mockOrder = { _id: "order1" };

      orderData.getOrderByTableDB.mockResolvedValue(mockOrder);

      const result = await orderService.getTableOrderService("table1");

      expect(result).toEqual(mockOrder);
      expect(orderData.createOrderDB).not.toHaveBeenCalled();
    });

    it("should create order if not exists", async () => {
      orderData.getOrderByTableDB.mockResolvedValue(null);

      const newOrder = { _id: "newOrderId" };
      orderData.createOrderDB.mockResolvedValue(newOrder);

      const result = await orderService.getTableOrderService("table1");

      expect(orderData.createOrderDB).toHaveBeenCalled();
      expect(orderData.updateTableOrderDB).toHaveBeenCalledWith(
        "table1",
        "newOrderId",
      );
      expect(result).toEqual(newOrder);
    });

    it("should throw error if order not found", async () => {
      orderData.getOrderByIdDB.mockResolvedValue(null);
      await expect(
        orderService.addItemsToOrderService("invalidOrderId", []),
      ).rejects.toThrow("Order not found");
    });
  });
});
