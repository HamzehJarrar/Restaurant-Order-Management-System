import "../src/config/env.js";
import mongoose from "mongoose";
import connectDB from "../database/connection.js";
import { TableModel } from "../database/models/table.model.js";

const seedTables = async () => {
  try {
    await connectDB();

    const tableNumbers = [1, 2, 3, 4, 5];

    const operations = tableNumbers.map((number) => ({
      updateOne: {
        filter: { number },
        update: { $setOnInsert: { number, status: "available" } },
        upsert: true,
      },
    }));

    await TableModel.bulkWrite(operations);

    const tables = await TableModel.find({ number: { $in: tableNumbers } })
      .sort({ number: 1 })
      .lean();

    console.log("Seeded tables:", tables.map((t) => t.number));
  } catch (error) {
    console.error("Failed to seed tables:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedTables();
