import * as MenuData from "./menu.data.js";
import { AppError } from "../../utils/appError.js";

export const getAllMenuItems = async () => {
  return await MenuData.getMenu();
};

export const addMenuItem = async (item) => {
  return await MenuData.addMenuItem(item);
};

export const getMenuById = async (id) => {
  return await MenuData.getMenuItemById(id);
};

export const updateMenuItem = async (id, data) => {
  const item = await MenuData.getMenuItemById(id);
  if (!item) {
    throw new AppError("Item not found", 404);
  }
  return await MenuData.updateMenuItem(id, data); 
};

export const deleteMenuItem = async (id) => {
  return await MenuData.deleteMenuItem(id);
};

