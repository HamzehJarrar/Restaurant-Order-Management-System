import Joi from "joi";
import { objectId } from "./common.js";

export const createMenuItemSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(1).required(),
    price: Joi.number().positive().required(),
    category: Joi.string().allow("").optional(),
    image: Joi.string().uri().allow("").optional(),
    isAvailable: Joi.boolean().optional(),
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required(),
});

export const updateMenuItemSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(1).optional(),
    price: Joi.number().positive().optional(),
    category: Joi.string().allow("").optional(),
    image: Joi.string().uri().allow("").optional(),
    isAvailable: Joi.boolean().optional(),
  })
    .min(1)
    .required(),
  params: Joi.object({ id: objectId().required() }).required(),
  query: Joi.object({}).required(),
});
