import Joi from "joi";

export const objectId = () =>
  Joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("Invalid ObjectId");
