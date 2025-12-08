import * as MenuData from "./menu.data.js";

export const addMenuItem = (item) => {
  return MenuData.addMenuItem(item);
};

export const isExistMenuItem = (name) => {
  return MenuData.isExistMenuItem(name);
};

export const getAllMenuItems = (category) => {
  return MenuData.getAllMenuItems(category);
};

export const updateMenuItem = (id, data) => {
  return MenuData.updateMenuItem(id, data);
};

export const deleteMenuItem = (id) => {
  return MenuData.deleteMenuItem(id);
};
