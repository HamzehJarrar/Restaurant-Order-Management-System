import Joi from "joi";

export const addMenuItemValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().positive().required(),
    image: Joi.string().uri().allow("", null),
    category: Joi.string().required(),
    available: Joi.boolean().default(true),
    description: Joi.string().max(300).allow("", null),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).json({ success: false, message: error.details[0].message });

  next();
};
