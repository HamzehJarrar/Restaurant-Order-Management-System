import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    tableNumber: Number,
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        notes: String,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "cooking", "ready", "served"],
      default: "pending",
    },
    totalAmount: Number,
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model("Order", OrderSchema);
