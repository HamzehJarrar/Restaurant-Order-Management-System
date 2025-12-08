import * as menuService from "./menu.service.js";
import { getPagination, getPaginationData } from "../../utils/pagination/pagination.js";


export const addMenuItem = async (req, res) => {
  const { name } = req.body;
  const isExist = await menuService.isExistMenuItem(name);
  if (isExist)
    return res
      .status(400)
      .json({ success: false, message: "Menu item already exists" });

  const item = await menuService.addMenuItem(req.body);

  res.status(201).json({
    success: true,
    message: "Menu item added successfully",
    data: item,
  });
};

export const getAllMenuItems = async (req, res) => {
  const { page, limit, skip } = getPagination(req);
  const { category } = req.query;

  const data = await menuService.getAllMenuItems(category, skip, limit);

  const response = getPaginationData(data, page, limit);

  res.status(200).json({
    success: true,
    ...response,
  });
};


export const updateMenuItem = async (req, res) => {
  const item = await menuService.updateMenuItem(req.params.id, req.body);

  if (!item)
    return res
      .status(404)
      .json({ success: false, message: "Menu item not found" });

  res.status(200).json({
    success: true,
    message: "Menu item updated successfully",
    data: item,
  });
};

export const deleteMenuItem = async (req, res) => {
  const item = await menuService.deleteMenuItem(req.params.id);

  if (!item)
    return res
      .status(404)
      .json({ success: false, message: "Menu item not found" });

  res.status(200).json({
    success: true,
    message: "Menu item deleted successfully",
  });
};
