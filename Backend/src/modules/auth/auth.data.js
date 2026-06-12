import { UserModel } from "../../../database/models/user.model.js";

export const createUser = (user) => UserModel.create(user);

export const findUserByEmail = (email) =>
  UserModel.findOne({ email }).select("+password");

export const findUserById = (id) =>
  UserModel.findById(id);

export const countUsers = () => UserModel.countDocuments();

export const incrementTokenVersion = (id) =>
  UserModel.findByIdAndUpdate(id, { $inc: { tokenVersion: 1 } }, { new: true });
