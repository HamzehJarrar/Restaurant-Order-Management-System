import { TableModel } from "../../../database/models/table.model.js";

export const getAllTables = () => {
    return TableModel.find().sort({ number: 1 }).exec();
}


export const createTable = (table) => {
    return TableModel.create(table);
}

export const getTableById = (id) => {
    return TableModel.findById(id);
}
