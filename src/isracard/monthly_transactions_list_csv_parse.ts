import { XlsxHandler } from '../lib/files/xlsx.handler.js';
import { reverseString } from '../lib/utils/string.js';
import {
  IL_TX_TITLE,
  ABROAD_TX_TITLE,
  RAW_IL_TO_PARSED_COLUMN_MAP,
  RAW_ABROAD_TO_PARSED_COLUMN_MAP,
} from './definitions.js';

function parseTransactionsTable(rows: string[][], columnMap: Record<string, string>) {
  rows = rows.slice(1); // remove title row
  const titlesRow = rows.shift();

  // remove the last row - its a total row
  rows.pop();

  const parsedTitlesRow = titlesRow?.map((title) => {
    return columnMap[reverseString(title)];
  });

  if (parsedTitlesRow?.some((title) => title === undefined)) {
    throw new Error('Undefined value in parsedTitlesRow');
  }

  // Parse rows into list of dictionaries
  const parsedRows = rows.map((row) => {
    const rowDict: Record<string, string> = {};
    parsedTitlesRow?.forEach((columnName, index) => {
      if (columnName) {
        rowDict[columnName] = row[index];
      }
    });
    return rowDict;
  });

  return parsedRows;
}

function parseTransactions(rows: string[][]) {
  const ilTxTitleIdx = rows.findIndex((row) => row[0] === reverseString(IL_TX_TITLE));

  if (ilTxTitleIdx === -1) {
    throw new Error('IL_TX_TITLE not found');
  }
  const abroadTxTitleIdx = rows.findIndex((row) => row[0] === reverseString(ABROAD_TX_TITLE));

  if (abroadTxTitleIdx === -1) {
    throw new Error('ABROAD_TX_TITLE not found');
  }
  const ilTxs = rows.slice(ilTxTitleIdx, abroadTxTitleIdx) as string[][];
  const parsedIlTxs = parseTransactionsTable(ilTxs, RAW_IL_TO_PARSED_COLUMN_MAP);
  const abroadTxs = rows.slice(abroadTxTitleIdx, rows.length - 1) as string[][];

  const parsedAbroadTxs = parseTransactionsTable(abroadTxs, RAW_ABROAD_TO_PARSED_COLUMN_MAP);

  return [...parsedIlTxs, ...parsedAbroadTxs];
}

function run() {
  const filePath = 'private_data/credit_cards/monthly_exports/Export_3_2025.xls';
  const handler = new XlsxHandler(filePath, true);

  const sheets = handler.loadAllRows();
  const mainSheet = sheets[0];
  let rows = mainSheet.rows;
  rows = rows.slice(1); // remove empty row

  const secondRow = rows.shift();
  const cardOwner = secondRow?.[0];

  rows = rows.slice(1); // remove empty row
  const thirdRow = rows.shift();
  const billingDate = thirdRow?.[0];
  const cardIdentifier = thirdRow?.[2];

  const parsedTxs = parseTransactions(rows as string[][]);

  const enrichedTxs = parsedTxs.map((tx) => {
    return {
      ...tx,
      cardOwner,
      billingDate,
      cardIdentifier,
    };
  });

  console.log('enrichedTxs:', enrichedTxs);
}

run();
