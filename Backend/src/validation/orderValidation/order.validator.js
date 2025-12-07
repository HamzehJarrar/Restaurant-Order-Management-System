import Joi from "joi";

export const createOrderValidator = (req, res, next) => {
  const schema = Joi.object({
    tableNumber: Joi.number().min(1).required(),

    items: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().min(2).required(),
          price: Joi.number().positive().required(),
          quantity: Joi.number().min(1).required(),
          image: Joi.string().uri().allow("", null),
          notes: Joi.string().max(200).allow("", null),
        })
      )
      .min(1)
      .required(),

    status: Joi.string().valid("pending", "cooking", "ready", "served")
      .default("pending"),

    totalAmount: Joi.number().min(0), 
  });

  const { error } = schema.validate(req.body, { abortEarly: true });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
