import Joi from "joi";
import { objectId } from "./common.js";

export const createTableSchema = Joi.object({
  body: Joi.object({
    number: Joi.number().integer().positive().required(),
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required(),
});

export const freeTableSchema = Joi.object({
  body: Joi.object({}).required(),
  params: Joi.object({
    id: objectId().required(),
  }).required(),
  query: Joi.object({}).required(),
});
