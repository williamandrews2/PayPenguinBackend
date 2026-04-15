const prisma = require("../prisma/prismaClient");

// GET /api/bills
const getBills = async (req, res) => {
  try {
    const bills = await prisma.bill.findMany({
      where: { userId: req.user.id },
    });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// POST /api/bills
const createBill = async (req, res) => {
  const { name, amount, dueDate } = req.body;

  try {
    const bill = await prisma.bill.create({
      data: {
        name,
        amount,
        dueDate: new Date(dueDate),
        userId: req.user.id,
      },
    });
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// PUT /api/bills/:id
const updateBill = async (req, res) => {
  const { name, amount, dueDate } = req.body;

  try {
    // Make sure the bill belongs to the logged in user
    const existing = await prisma.bill.findUnique({
      where: { id: req.params.id },
    });

    if (!existing || existing.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bill = await prisma.bill.update({
      where: { id: req.params.id },
      data: { name, amount, dueDate: new Date(dueDate) },
    });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// DELETE /api/bills/:id
const deleteBill = async (req, res) => {
  try {
    // Make sure the bill belongs to the logged in user
    const existing = await prisma.bill.findUnique({
      where: { id: req.params.id },
    });

    if (!existing || existing.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.bill.delete({ where: { id: req.params.id } });
    res.json({ message: "Bill deleted" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// PATCH /api/bills/:id/paid
const togglePaid = async (req, res) => {
  try {
    const existing = await prisma.bill.findUnique({
      where: { id: req.params.id },
    });

    if (!existing || existing.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bill = await prisma.bill.update({
      where: { id: req.params.id },
      data: { isPaid: !existing.isPaid },
    });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { getBills, createBill, updateBill, deleteBill, togglePaid };
