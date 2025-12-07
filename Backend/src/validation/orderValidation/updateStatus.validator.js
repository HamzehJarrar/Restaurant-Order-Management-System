import Joi from "joi";

export const updateStatusValidator = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string()
      .valid("pending", "cooking", "ready", "served")
      .required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).json({ success: false, message: error.details[0].message });

  next();
};
