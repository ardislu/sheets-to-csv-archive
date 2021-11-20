const UI = SpreadsheetApp.getUi();
const WORKBOOK = SpreadsheetApp.getActive();

function onOpen() {
  UI.createMenu('📁 Archive')
    .addItem('❓ Help', 'showHelp')
    .addItem('🔥 Generate CSV archive', 'generateCSVArchive')
    .addToUi();
}

function showHelp() {
  const helpMessage = `Welcome to sheets-to-csv-archive!

USAGE:
- Edit the data on this workbook like you would on any other Google Sheet.
- When ready, press the "Generate CSV archive" button to generate a .zip archive file containing a .csv file for each sheet in this Google Sheet.`;

  UI.alert('Help', helpMessage, UI.ButtonSet.OK);
}

// Helper function to return the server-side .zip data. This function will be called from the client-side HtmlService dialog.
function generateZipData() {
  const sheets = WORKBOOK.getSheets();

  let csvBlobs = [];
  for (let sheet of sheets) {
    let csvString = '';
    sheet.getDataRange().getValues().forEach(row => csvString += `${row.join(',')}\n`); // Naively converts a sheet to CSV by inserting commas and newlines. Does not escape anything!
    csvBlobs.push(Utilities.newBlob(csvString, 'text/csv', `${sheet.getName()}.csv`));
  }

  const zip = Utilities.zip(csvBlobs);

  return Utilities.base64Encode(zip.getBytes());
}

function generateCSVArchive() {
  // Generate an <a> tag with a data URL containing the base64-encoded data from above.
  // To fetch the server-side data from the client-side iframe, google.script.run.withSuccessHandler.(callback).getData() is called, where the callback is a function to inject the data to the <a> tag and getData is a helper function.
  const html = HtmlService.createHtmlOutput("<a download>Download</a><script>google.script.run.withSuccessHandler(data => document.querySelector('a').setAttribute('href', `data:application/zip;base64,${data}`)).generateZipData()</script>");

  UI.showModalDialog(html, 'Generating CSV archive...');
}
