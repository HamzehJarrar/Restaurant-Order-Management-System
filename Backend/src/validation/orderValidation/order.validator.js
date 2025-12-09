import Joi from "joi";


export const createOrderValidator = (req, res, next) => {
  const schema = Joi.object({
    tableNumber: Joi.number().integer().min(1).required(),
  });

  const { error } = schema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};



export const addItemValidator = (req, res, next) => {
  const schema = Joi.object({
    menuId: Joi.string().required(),
    name: Joi.string().min(2).required(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().integer().min(1).required(),
    image: Joi.string().uri().allow("", null),
    notes: Joi.string().max(200).allow("", null),
  });

  const { error } = schema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
