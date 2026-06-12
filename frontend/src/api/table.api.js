import { api } from "./axios";

export const getTables = async () => {
  const { data } = await api.get("/tables");
  return data.data;
};
