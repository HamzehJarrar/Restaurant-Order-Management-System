import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },

    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        notes: { type: String },
      },
    ],

    status: {
      type: String,
      enum: ["pending", "cooking", "ready", "served"],
      default: "pending",
    },

    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", OrderSchema);
