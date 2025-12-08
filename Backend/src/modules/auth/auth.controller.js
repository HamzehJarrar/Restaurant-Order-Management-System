import * as userService from "./user.service.js";

export const register = async (req, res) => {
  const result = await userService.register(req.body);

  if (result.error) {
    return res.status(400).json({ success: false, message: result.error });
  }

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await userService.login(email, password);

  if (result.error) {
    return res.status(400).json({ success: false, message: result.error });
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};
