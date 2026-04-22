const { body } = require("express-validator");

const billValidation = [
  body("name").trim().notEmpty().withMessage("Bill name is required"),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Due date must be a valid date"),
];

module.exports = { billValidation };
