import { v4 as uuid } from "uuid";
import path from "path";

export const generateResultPath = (): string =>
  path.join("results", `${uuid()}.csv`);