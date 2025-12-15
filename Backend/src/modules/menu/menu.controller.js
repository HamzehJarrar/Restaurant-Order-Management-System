import * as menuService from "./menu.service.js";
import cloudinary from "../../config/cloudinary.js";
import {
  uploadImage,
  deleteImageByUrl,
} from "../../utils/cloudinary.helper.js";
import { ApiError } from "../../utils/ApiError.js";

export const getMenu = async (req, res) => {
  const items = await menuService.getAllMenuItems();

  res.status(200).json({
    success: true,
    data: items,
  });
};

export const addMenuItem = async (req, res) => {
  let imageUrl = "";

  if (req.file) {
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "restaurant/menu",
      }
    );

    imageUrl = result.secure_url;
  }

  const item = await menuService.addMenuItem({
    ...req.body,
    image: imageUrl,
  });

  res.status(201).json({
    success: true,
    data: item,
  });
};

export const updateMenuItem = async (req, res) => {
  const { id } = req.params;

  const menuItem = await menuService.getMenuById(id);
  if (!menuItem) {
    throw new ApiError("Menu item not found", 404);
  }

  let image = menuItem.image;

  if (req.file) {
    await deleteImageByUrl(menuItem.image);
    image = await uploadImage(req.file, "restaurant/menu");
  }

  const updatedItem = await menuService.updateMenuItem(id, {
    ...req.body,
    image,
  });

  res.status(200).json({
    success: true,
    data: updatedItem,
  });
};

export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  const item = await menuService.getMenuById(id);

  if (!item) {
    throw new ApiError("Menu item not found", 404);
  }

  if (item.image) {
    await deleteImageByUrl(item.image);
  }
  await menuService.deleteMenuItem(id);

  res.status(200).json({
    success: true,
    message: "Menu item deleted successfully",
  });
};
