const { Router } = require("express");
const billsRouter = Router();
const { protect } = require("../middleware/auth");
const {
  getBills,
  createBill,
  updateBill,
  deleteBill,
  togglePaid,
} = require("../controllers/billsController");
const { billValidation } = require("../middleware/billsValidation");
const validate = require("../middleware/validate");

billsRouter.get("/", protect, getBills);
billsRouter.post("/", protect, billValidation, validate, createBill);
billsRouter.put("/:id", protect, billValidation, validate, updateBill);
billsRouter.delete("/:id", protect, deleteBill);
billsRouter.patch("/:id/paid", protect, togglePaid);

module.exports = billsRouter;
