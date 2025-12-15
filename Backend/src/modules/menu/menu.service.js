import * as MenuData from "./menu.data.js";
import { AppError } from "../../utils/appError.js";
export const getMenu = () => {
  return MenuData.getMenu();
};

export const addMenuItem = (item) => {
  return MenuData.addMenuItem(item);
};

export const updateMenuItem = (id, data) => {
  const item = MenuData.getMenuItemById(id);
  if (!item) {
    throw new AppError("Item not found", 404);
  }
  return MenuData.updateMenuItem(item, data);
};

export const deleteMenuItem = (id) => {
  const item = MenuData.getMenuItemById(id);
  if (!item) {
    throw new AppError("Item not found", 404);
  }
  return MenuData.deleteMenuItem(item);
};
