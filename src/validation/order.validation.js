import Joi from "joi";
import { objectId } from "./common.js";

const orderItem = Joi.object({
  name: Joi.string().min(1).required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(1).required(),
  notes: Joi.string().allow("").optional(),
});

export const createOrderSchema = Joi.object({
  body: Joi.object({
    table: objectId().required(),
    items: Joi.array().items(orderItem).min(1).required(),
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required(),
});

export const getTableOrderSchema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({
    tableId: objectId().required(),
  }).required(),
  query: Joi.object({}).required(),
});

export const updateOrderSchema = Joi.object({
  body: Joi.object({
    items: Joi.array().items(orderItem).min(1).required(),
  }).required(),
  params: Joi.object({
    id: objectId().required(),
  }).required(),
  query: Joi.object({}).required(),
});

export const updateOrderStatusSchema = Joi.object({
  body: Joi.object({
    status: Joi.string().valid("pending", "cooking", "ready", "served").required(),
  }).required(),
  params: Joi.object({
    id: objectId().required(),
  }).required(),
  query: Joi.object({}).required(),
});
    