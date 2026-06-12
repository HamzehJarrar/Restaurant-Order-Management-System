import cloudinary from "../config/cloudinary.js";

export const extractPublicId = (url = "") => {
  if (!url) return null;

  const parts = url.split("/");
  const folderIndex = parts.findIndex(p => p === "restaurant");

  if (folderIndex === -1) return null;

  return parts
    .slice(folderIndex)
    .join("/")
    .replace(/\.[^/.]+$/, "");
};

export const uploadImage = async (file, folder) => {
  const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64, { folder });

  return result.secure_url;
};

export const deleteImageByUrl = async (url) => {
  const publicId = extractPublicId(url);
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId);
};
