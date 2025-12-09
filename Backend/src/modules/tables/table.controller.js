import { TableModel } from "../../../database/models/table.model.js";

export const getTables = async (req, res) => {
  const tables = await TableModel.find();
  res.json({ success: true, data: tables });
};

export const createTable = async (req, res) => {
  const { number } = req.body;

  if (!number)
    return res.status(400).json({ message: "Table number is required" });
  else if (number < 1)
    return res
      .status(400)
      .json({ message: "Table number must be greater than 0" });

  const exists = await TableModel.findOne({ number });
  if (exists) return res.status(400).json({ message: "Table already exists" });

  const table = await TableModel.create({ number });
  res.json({ success: true, data: table });
};

export const assignTable = async (req, res) => {
  const { number } = req.params;
  const { orderId } = req.body;

  const table = await TableModel.findOne({ number });
  if (!table) return res.status(404).json({ message: "Table not found" });

  table.status = "occupied";
  table.currentOrder = orderId;
  await table.save();

  res.json({ success: true, message: "Table assigned", data: table });
};

export const freeTable = async (req, res) => {
  const { number } = req.params;

  const table = await TableModel.findOne({ number });
  if (!table) return res.status(404).json({ message: "Table not found" });

  table.status = "available";
  table.currentOrder = null;
  await table.save();

  res.json({ success: true, message: "Table freed", data: table });
};
