import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  const user = await authService.register(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
};

export const login = async (req, res) => {
  const data = await authService.login(req.body.email, req.body.password);

  res.cookie("refreshToken",  data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data,
  });
};

export const refresh = async (req, res) => {
  const accessToken = await authService.refreshToken(req.cookies.refreshToken);

  res.status(200).json({
    success: true,
    data: { accessToken },
  });
};

export const logout = async (req, res) => {
  await authService.incrementTokenVersion(req.user.sub);

  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
