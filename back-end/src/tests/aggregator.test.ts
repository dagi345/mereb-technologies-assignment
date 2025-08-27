import fs from "fs";
import path from "path";
import { aggregateSales } from "../../src/services/aggregator";

describe("aggregateSales", () => {
  it("sums sales per department", async () => {
    const testCsvPath = path.join(__dirname, "mock.csv");
    fs.writeFileSync(
      testCsvPath,
      `Department Name,Date,Number of Sales
        Electronics,2023-01-01,10
        Electronics,2023-01-02,5
        Home,2023-01-01,3`
    );

    const { outputPath } = await aggregateSales(testCsvPath);
    const content = fs.readFileSync(outputPath, "utf-8");
    expect(content).toContain("Electronics,15");
    expect(content).toContain("Home,3");

    // cleanup
    fs.unlinkSync(testCsvPath);
    fs.unlinkSync(outputPath);
  });
});
