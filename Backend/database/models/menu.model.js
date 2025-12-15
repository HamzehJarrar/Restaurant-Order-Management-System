import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    image: {
      type: String,
      default: "",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const MenuModel = mongoose.model("Menu", MenuSchema);
