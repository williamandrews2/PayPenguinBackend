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

billsRouter.get("/", protect, getBills);
billsRouter.post("/", protect, createBill);
billsRouter.put("/:id", protect, updateBill);
billsRouter.delete("/:id", protect, deleteBill);
billsRouter.patch("/:id/paid", protect, togglePaid);

module.exports = billsRouter;
