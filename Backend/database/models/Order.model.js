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
        menuItemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },

      },
    ],

    status: {
      type: String,
      enum: ["pending", "OPEN", "cooking", "ready", "served", "paid"],
      default: "pending",
    },

    totalAmount: {
      type: Number,
      required: true,
    },
    notes: { type: String, default: "" },
    
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", OrderSchema);
