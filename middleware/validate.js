const { validationResult } = require("express-validator");

// this middlware just check if there are any errors before pushing the data to Prisma
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
