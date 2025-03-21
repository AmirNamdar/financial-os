import pkg from 'xlsx';
const { readFile, utils } = pkg;

function loadAllRows(filePath: string): unknown[][] {
  try {
    const workbook = readFile(filePath);
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = utils.sheet_to_json(firstSheet, { header: 1 }) as unknown[][];
    console.log('All rows:', rows);
    return rows;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

// Test the function
const filePath = 'private_data/credit_cards/monthly_exports/Export_3_2025.xls';
loadAllRows(filePath);
