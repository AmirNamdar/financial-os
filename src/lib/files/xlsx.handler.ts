import pkg from 'xlsx';
import { isHebrew } from '../loacale/hebrew.js';
const { readFile, utils } = pkg;

export type SheetData = {
  name: string;
  rows: unknown[][];
};

export class XlsxHandler {
  private readonly filePath: string;
  private readonly isRTL: boolean;

  constructor(filePath: string, isRTL: boolean = false) {
    this.filePath = filePath;
    this.isRTL = isRTL;
  }

  /**
   * Loads all rows from all sheets in the XLSX file
   * @returns An array of objects containing sheet names and their rows, where each object has:
   *         - name: The name of the sheet
   *         - rows: A 2D array containing all rows from the sheet
   */
  loadAllRows(): SheetData[] {
    try {
      const workbook = readFile(this.filePath);
      const sheets = workbook.SheetNames.map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const rows = utils.sheet_to_json(sheet, { header: 1 }) as unknown[][];

        // If RTL is enabled, reverse the characters in each **eligible** cell
        if (this.isRTL) {
          return {
            name: sheetName,
            rows: rows.map((row) =>
              row.map((cell) =>
                typeof cell === 'string' && isHebrew(cell)
                  ? cell.split('').reverse().join('')
                  : cell,
              ),
            ),
          };
        }

        return {
          name: sheetName,
          rows,
        };
      });
      return sheets;
    } catch (error) {
      console.error('Error reading XLSX file:', error);
      throw error;
    }
  }
}
