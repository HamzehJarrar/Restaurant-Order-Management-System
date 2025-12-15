import * as tableService from "./table.service.js";

export const getAllTables = (req, res) => {
  const tables = tableService.getAllTables();
  res.status(200).json({ success: true, data: tables });
};

export const createTable = (req, res) => {
  const table = tableService.createTable(req.body);
  res.status(201).json({ success: true, data: table });
};

export const getTableById = (req, res) => {
  const table = tableService.getTableById(req.params.id);
  res.status(200).json({ success: true, data: table });
};