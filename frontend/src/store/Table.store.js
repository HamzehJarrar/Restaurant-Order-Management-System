import { create } from "zustand";

export const useTableStore = create((set) => ({
  tables: [],
  tableNumbers: [],
  selectedTable: null,
  order: null,              
  setSelectedTable: (table) => set({ selectedTable: table }),
  setTables: (tables) =>
    set({ tables, tableNumbers: tables.map((table) => table.number) }),
  setOrder: (order) => set({ order }), 
}));
