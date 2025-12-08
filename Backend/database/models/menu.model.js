import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: "",
      maxlength: 300,
    },
  },
  { timestamps: true }
);

export const MenuModel = mongoose.model("Menu", MenuSchema);
