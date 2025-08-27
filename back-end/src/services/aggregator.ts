import fs from "fs";
import csv from "csv-parser";
import { generateResultPath } from "../utils/file";
import path from "path";

export interface Row {
  "Department Name": string;
  Date: string;
  "Number of Sales": string;
}

export const aggregateSales = (
  filePath: string
): Promise<{ outputPath: string; departmentCount: number; processingTimeMs: number }> => {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const totals: Record<string, number> = {};

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row: Row) => {
        const dept = row["Department Name"];
        const sales = parseInt(row["Number of Sales"], 10);
        if (!isNaN(sales)) {
          totals[dept] = (totals[dept] || 0) + sales;
        }
      })
      .on("end", () => {
        const outputPath = generateResultPath();
        const writeStream = fs.createWriteStream(outputPath);
        writeStream.write("Department Name,Total Number of Sales\n");
        const departments = Object.keys(totals);
        departments.forEach((dept) => {
          writeStream.write(`${dept},${totals[dept]}\n`);
        });
        writeStream.end(() => {
          resolve({
            outputPath,
            departmentCount: departments.length,
            processingTimeMs: Date.now() - started,
          });
        });
      })
      .on("error", reject);
  });
};

