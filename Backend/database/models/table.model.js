import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  status: {
    type: String,
    enum: ["available", "occupied"],
    default: "available",
  },
  currentOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    default: null,
  },
});

export const TableModel = mongoose.model("Table", TableSchema);
