type Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
type Sheet = GoogleAppsScript.Spreadsheet.Sheet;

function main() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  const sheet = getOrInsertSheet(spreadsheet, '温度と湿度');

  const device = fetchDevice(process.env.TOKEN);

  const { te, hu } = device.newest_events

  sheet.appendRow([
    (new Date).toUTCString(),
    te.val,
    hu.val
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

const API_ENDPOINT = 'https://api.nature.global/1/devices';

function fetchDevice(token) {
   const response = UrlFetchApp.fetch(API_ENDPOINT, {
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     }
   });

   // NOTE: I have only one device ;)
   return JSON.parse(response.getContentText())[0];
}
