import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: Number,
      required: true,
    },

    items: [
      {
        menuId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        image: String,
        notes: String,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "cooking", "ready", "served", "completed"], // أضفنا completed
      default: "pending",
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    table: { type: Number, required: true },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", OrderSchema);
