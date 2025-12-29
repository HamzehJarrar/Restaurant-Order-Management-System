// src/api/table.api.js
import { api } from "./axios";

export const getTables = async () => {
  const res = await api.get("/tables");
  return res.data.data;
};
