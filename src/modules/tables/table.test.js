import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("./table.data.js", () => ({
  getAllTables: jest.fn(),
  createTable: jest.fn(),
  getTableById: jest.fn(),
}));

const tableData = await import("./table.data");
const tableService = await import("./table.service");

describe("Table Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllTables", () => {
    it("should return all tables", async () => {
      const mockTables = [[{ number: 1, status: "available" }]];
      tableData.getAllTables.mockResolvedValue(mockTables);

      const tables = await tableService.getAllTables();
      expect(tables).toEqual(mockTables);
      expect(tableData.getAllTables).toHaveBeenCalledTimes(1);
    });
  });

  describe("createTable", () => {
    it("should create a new table", async () => {
      const newTable = { number: 1, status: "available", currentOrder: null };
      tableData.createTable.mockResolvedValue(newTable);

      const createdTable = await tableService.createTable(newTable);
      expect(createdTable).toEqual(newTable);
      expect(tableData.createTable).toHaveBeenCalledWith(newTable);
    });
  });

  describe("getTableById", () => {
    it("should get a table by id", async () => {
      const tableId = 1;
      const mockTable = { number: 1, status: "available", currentOrder: null };
      tableData.getTableById.mockResolvedValue(mockTable);
      const table = await tableService.getTableById(tableId);
      expect(table).toEqual(mockTable);
      expect(tableData.getTableById).toHaveBeenCalledWith(tableId);
    });
  });
});
