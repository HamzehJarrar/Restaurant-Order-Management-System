import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserData from "./auth.data.js";
import { AppError } from "../../utils/AppError.js";

const generateAccessToken = (user) =>
  jwt.sign(
    { sub: user._id, role: user.role, tokenVersion: user.tokenVersion },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );

const generateRefreshToken = (user) =>
  jwt.sign(
    { sub: user._id, tokenVersion: user.tokenVersion },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

export const refreshToken = async (token) => {
  if (!token) throw new AppError("Unauthorized", 401);

  const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  const user = await UserData.findUserById(payload.sub);
  if (!user || user.tokenVersion !== payload.tokenVersion)
    throw new AppError("Unauthorized", 401);

  return generateAccessToken(user);
};

export const register = async (userData) => {
  const existingUser = await UserData.findUserByEmail(userData.email);
  if (existingUser) throw new AppError("Email already exists", 409);

  const hashedPassword = await bcrypt.hash(
    userData.password,
    parseInt(process.env.SALT)
  );

  // First user ever becomes admin automatically
  const userCount = await UserData.countUsers();
  const role = userCount === 0 ? "admin" : "waiter";

  return UserData.createUser({ ...userData, role, password: hashedPassword });
};

export const login = async (email, password) => {
  const user = await UserData.findUserByEmail(email);
  if (!user) throw new AppError("Invalid credentials", 401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new AppError("Invalid credentials", 401);

  const accessToken  = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken: newRefreshToken,
    user: { id: user._id, email: user.email, role: user.role },
  };
};

export const incrementTokenVersion = async (userId) => {
  await UserData.incrementTokenVersion(userId);
};
