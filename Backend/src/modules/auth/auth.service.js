import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserData from "./user.data.js";

export const register = async (userData) => {
  const existingUser = await UserData.findUserByEmail(userData.email);

  if (existingUser) {
    return { error: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(userData.password, process.env.SALT);

  const newUser = await UserData.createUser({
    ...userData,
    password: hashedPassword,
  });

  return newUser;
};

export const login = async (email, password) => {
  const user = await UserData.findUserByEmail(email);

  if (!user) return { error: "Invalid email or password" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) return { error: "Invalid email or password" };

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
