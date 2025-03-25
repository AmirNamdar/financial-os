export const IL_TX_TITLE = 'עסקאות בארץ';
export const ABROAD_TX_TITLE = 'עסקאות בחו˝ל';

export enum RawILTransactionsTableColumns {
  PurchaseDate = 'תאריך רכישה',
  BusinessName = 'שם בית עסק',
  Amount = 'סכום עסקה',
  AmountCharged = 'סכום חיוב',
  OriginalCurrency = 'מטבע מקור',
  CurrencyCharged = 'מטבע לחיוב',
  VoucherNumber = 'מספר שובר',
  MoreDetails = 'פירוט נוסף',
}

enum RawAbroadTransactionsTableColumns {
  PurchaseDate = 'תאריך רכישה',
  ChargeDate = 'תאריך חיוב',
  BusinessName = 'שם בית עסק',
  Amount = 'סכום מקורי',
  AmountCharged = 'סכום חיוב',
  OriginalCurrency = 'מטבע מקור',
  CurrencyCharged = 'מטבע לחיוב',
}

// TODO: extract this to a definitions file of a future 'data import' module
enum ParsedTransactionsTableColumns {
  PurchaseDate = 'Purchase Date',
  BusinessName = 'Business Name',
  Amount = 'Amount',
  AmountCharged = 'Amount Charged',
  OriginalCurrency = 'Original Currency',
  CurrencyCharged = 'Currency Charged',
  VoucherNumber = 'Voucher Number',
  MoreDetails = 'More Details',
  ChargeDate = 'Charge Date',
}

export const RAW_IL_TO_PARSED_COLUMN_MAP = {
  [RawILTransactionsTableColumns.PurchaseDate]: ParsedTransactionsTableColumns.PurchaseDate,
  [RawILTransactionsTableColumns.BusinessName]: ParsedTransactionsTableColumns.BusinessName,
  [RawILTransactionsTableColumns.Amount]: ParsedTransactionsTableColumns.Amount,
  [RawILTransactionsTableColumns.AmountCharged]: ParsedTransactionsTableColumns.AmountCharged,
  [RawILTransactionsTableColumns.OriginalCurrency]: ParsedTransactionsTableColumns.OriginalCurrency,
  [RawILTransactionsTableColumns.CurrencyCharged]: ParsedTransactionsTableColumns.CurrencyCharged,
  [RawILTransactionsTableColumns.VoucherNumber]: ParsedTransactionsTableColumns.VoucherNumber,
  [RawILTransactionsTableColumns.MoreDetails]: ParsedTransactionsTableColumns.MoreDetails,
};

export const RAW_ABROAD_TO_PARSED_COLUMN_MAP = {
  [RawAbroadTransactionsTableColumns.PurchaseDate]: ParsedTransactionsTableColumns.PurchaseDate,
  [RawAbroadTransactionsTableColumns.ChargeDate]: ParsedTransactionsTableColumns.ChargeDate,
  [RawAbroadTransactionsTableColumns.BusinessName]: ParsedTransactionsTableColumns.BusinessName,
  [RawAbroadTransactionsTableColumns.Amount]: ParsedTransactionsTableColumns.Amount,
  [RawAbroadTransactionsTableColumns.AmountCharged]: ParsedTransactionsTableColumns.AmountCharged,
  [RawAbroadTransactionsTableColumns.OriginalCurrency]:
    ParsedTransactionsTableColumns.OriginalCurrency,
  [RawAbroadTransactionsTableColumns.CurrencyCharged]:
    ParsedTransactionsTableColumns.CurrencyCharged,
};
