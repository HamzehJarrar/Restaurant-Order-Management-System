import { MenuModel } from "../../../database/models/menu.model.js";

export const addMenuItem = (item) => {
  return MenuModel.create(item);
};

export const isExistMenuItem = (name) => {
  return MenuModel.findOne({ name });
};

export const getAllMenuItems = (category) => {
  let filter = {};

  if (category) {
    filter.category = category;
  }

  return MenuModel.find(filter).sort({ createdAt: -1 });
};


export const updateMenuItem = (id, data) => {
  return MenuModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteMenuItem = (id) => {
  return MenuModel.findByIdAndDelete(id);
};
