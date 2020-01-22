function postToDiscord() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  const sheet = spreadsheet.getSheetByName('温度と湿度'),
        row = sheet.getLastRow();

  const temperature = sheet.getRange(row, 2).getValue(),
        humidity = sheet.getRange(row, 3).getValue();

  UrlFetchApp.fetch(
    process.env.HOOK_ENDPOINT,
    {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        embeds: [
          {
            fields: [
              {
                name: '温度',
                value: `${temperature}度`,
                inline: true
              },
              {
                name: '湿度',
                value: `${humidity}%`,
                inline: true
              }
            ]
          }
        ]
      })
    }
  )
}
