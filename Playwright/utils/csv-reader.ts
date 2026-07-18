import fs from "fs";
import { parse } from "csv-parse/sync";

export function readCsv<T>(filepath: string): T[] {
  const fileContent = fs.readFileSync(filepath);

  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }) as T[];
}
