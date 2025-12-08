import Joi from "joi";

export const updateMenuItemValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2),
    price: Joi.number().positive(),
    image: Joi.string().uri().allow("", null),
    category: Joi.string(),
    available: Joi.boolean(),
    description: Joi.string().max(300).allow("", null),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  next();
};
