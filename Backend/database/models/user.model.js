import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "waiter"],
      default: "waiter",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
