"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAllRows = loadAllRows;
var xlsx_1 = require("xlsx");
function loadAllRows(filePath) {
    var workbook = (0, xlsx_1.readFile)(filePath);
    var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    var rows = xlsx_1.utils.sheet_to_json(firstSheet, { header: 1 });
    console.log('All rows:', rows);
    return rows;
}
// Test the function
var filePath = 'private_data/credit_cards/monthly_exports/Export_3_2025.xls';
loadAllRows(filePath);
