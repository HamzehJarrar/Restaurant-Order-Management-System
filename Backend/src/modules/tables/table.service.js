import * as tableData from "./table.data.js";
import { AppError } from "../../utils/appError.js";

export const getAllTables = async () => {
    return await tableData.getAllTables();
}

export const createTable = async (table) => {
    return await tableData.createTable(table);
}

export const getTableById = async (id) => {
    const table = await tableData.getTableById(id);
    if (!table) {
        throw new AppError("Table not found", 404);
    }
    return table;
}
