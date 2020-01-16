type Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
type Sheet = GoogleAppsScript.Spreadsheet.Sheet;

function main() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    const sheet = getOrInsertSheet(spreadsheet, '時間');

    sheet.appendRow([
        (new Date).toUTCString(),
        process.env.SECRET
    ]);
}

function getOrInsertSheet(spreadsheet: Spreadsheet, sheetName: string): Sheet {
    const sheet = spreadsheet.getSheetByName(sheetName);

    if (sheet) {
        return sheet;
    } else {
        return spreadsheet.insertSheet(sheetName);
    }
}