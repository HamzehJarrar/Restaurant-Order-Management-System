import { MenuModel } from "../../../database/models/menu.model.js";

export const getMenu = () => {
  return MenuModel.find();
};

export const addMenuItem = (item) => {
  return MenuModel.create(item);
};

export const getMenuItemById = (id) => {
  return MenuModel.findById(id);
};

export const updateMenuItem = (id, data) => {
  return MenuModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteMenuItem = (id) => {
  return MenuModel.findByIdAndDelete(id);
};
