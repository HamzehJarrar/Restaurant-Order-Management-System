import * as menuService from "./menu.service.js";

export const getMenu = async (req, res) => {
  const items = await menuService.getAllMenuItems();

  res.status(200).json({
    success: true,
    data: items,
  });
};

export const addMenuItem = async (req, res) => {
  const item = await menuService.addMenuItem(req.body);

  res.status(201).json({
    success: true,
    data: item,
  });
};

export const updateMenuItem = async (req, res) => {
  const item = await menuService.updateMenuItem(req.params.id, req.body);

  res.status(200).json({
    success: true,
    data: item,
  });
};

export const deleteMenuItem = async (req, res) => {
  const item = await menuService.deleteMenuItem(req.params.id);

  res.status(200).json({
    success: true,
    data: item,
  });
};