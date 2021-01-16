import { RequestHandler } from "express";
import { validationResult } from "express-validator";

const validate: RequestHandler = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.send(err.mapped());
  }

  next();
};

export default validate;
