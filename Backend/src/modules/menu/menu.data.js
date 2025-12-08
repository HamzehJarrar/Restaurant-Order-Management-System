import { MenuModel } from "../../../database/models/menu.model.js";

export const addMenuItem = (item) => {
  return MenuModel.create(item);
};

export const isExistMenuItem = (name) => {
  return MenuModel.findOne({ name });
};

export const getAllMenuItems = async (category, skip, limit) => {
  let filter = {};

  if (category) {
    filter.category = { $regex: category, $options: "i" };
  }

  const count = await MenuModel.countDocuments(filter);

  const items = await MenuModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return { count, items };
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
