import * as tableService from "./table.service.js";

export const getAllTables = async (req, res) => {
  const tables = await tableService.getAllTables();
  res.json({ success: true, data: tables });
};

export const createTable = async (req, res) => {
  const table = await tableService.createTable(req.body);
  res.status(201).json({ success: true, data: table });
};

export const getTableById = async (req, res) => {
  const table = await tableService.getTableById(req.params.id);
  res.status(200).json({ success: true, data: table });
};
