import { ApiError } from "../utils/ApiError.js";

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(
    {
      body: req.body,
      params: req.params,
      query: req.query,
    },
    { abortEarly: false }
  );

  if (error) {
    return next(
      new ApiError(
        error.details.map((d) => d.message).join(", "),
        400
      )
    );
  }

  req.body = value.body;
  req.params = value.params;
  req.query = value.query;

  next();
};
