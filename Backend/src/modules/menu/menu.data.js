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

export const updateMenuItem = (item, data) => {
  return MenuModel.findByIdAndUpdate(item, data, { new: true });
};

export const deleteMenuItem = (item) => {
  return MenuModel.findByIdAndDelete(item);
};
