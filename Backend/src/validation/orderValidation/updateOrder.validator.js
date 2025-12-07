import Joi from "joi";

export const updateOrderValidator = (req, res, next) => {
  const schema = Joi.object({
    tableNumber: Joi.number().min(1),

    items: Joi.array().items(
      Joi.object({
        name: Joi.string().min(2),
        price: Joi.number().positive(),
        quantity: Joi.number().min(1),
        image: Joi.string().uri().allow("", null),
        notes: Joi.string().max(200).allow("", null),
      })
    ),

    status: Joi.forbidden(),

    totalAmount: Joi.number().min(0),
  });

  const { error } = schema.validate(req.body, { abortEarly: true });

  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  next();
};
