/**
 * @OnlyCurrentDoc
 *
 * Reference: https://developers.google.com/apps-script/guides/services/authorization
 */

function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('📁 Archive')
    .addItem('❓ Help', 'showHelp')
    .addItem('🔥 Download CSV archive', 'downloadCSVArchive')
    .addToUi();
}

function showHelp() {
  const ui = SpreadsheetApp.getUi();

  const helpMessage = `Welcome to sheets-to-csv-archive!

  USAGE:
  - Edit the data on this workbook like you would on any other Google Sheet.
  - When ready, press the "Download CSV archive" button to generate a .zip archive file containing a .csv file for each sheet in this Google Sheet.`;

  ui.alert('Help', helpMessage, ui.ButtonSet.OK);
}

// Helper function to return the server-side .zip data. This function will be called from the client-side HtmlService dialog.
function generateZipData() {
  const workbook = SpreadsheetApp.getActive();
  const sheets = workbook.getSheets();

  const csvBlobs = [];
  for (const sheet of sheets) {
    const values = sheet.getDataRange().getValues();
    const csv = values.map(row => row.map(cell => `"${cell.toString().replaceAll('"', '""')}"`).join(',')).join('\n');
    csvBlobs.push(Utilities.newBlob(csv, 'text/csv', `${sheet.getName()}.csv`));
  }

  const zip = Utilities.zip(csvBlobs);

  return zip.getBytes();
}

function downloadCSVArchive() {
  const ui = SpreadsheetApp.getUi();

  // To fetch the server-side data from the client-side iframe, google.script.run.withSuccessHandler.(callback).generateZipData() is called, 
  // where callback is a function to inject the data to an <a> tag and generateZipData is a helper function.
  const html = HtmlService.createHtmlOutputFromFile('download').setWidth(1).setHeight(1);

  ui.showModelessDialog(html, 'Generating file...');
}
