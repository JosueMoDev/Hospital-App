const { response } = require("express");

const { validationResult } = require("express-validator");

const fieldsValidation = (req, resp = response, next) => {
  const validationHasError = validationResult(req);

  if (!validationHasError.isEmpty()) {
    return resp.status(400).json({
      ok: false,
      errors: validationHasError.mapped(),
    });
  }
  next();
};

module.exports = { fieldsValidation };
