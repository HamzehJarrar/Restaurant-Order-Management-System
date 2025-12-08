import { UserModel } from "../../../database/models/user.model.js";

export const createUser = (user) => {
  return UserModel.create(user);
};

export const findUserByEmail = (email) => {
  return UserModel.findOne({ email });
};
