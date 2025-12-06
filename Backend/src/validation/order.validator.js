import Joi from "joi";

export const createOrderValidator = (req, res, next) => {
  const schema = Joi.object({
    tableNumber: Joi.number().required(),

    items: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          price: Joi.number().min(0).required(),
          quantity: Joi.number().min(1).required(),
          image: Joi.string().allow(null, ""),
          notes: Joi.string().allow(null, ""),
        })
      )
      .min(1)
      .required(),
    status: Joi.string().valid("pending", "cooking", "ready", "served"),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};
