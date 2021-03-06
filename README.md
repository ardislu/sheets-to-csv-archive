# sheets-to-csv-archive

This is a Google Apps Script (GAS) project which adds a "Download CSV Archive" button to Google Sheets that allows users to download a .zip file containing a .csv file for each sheet in the Google Sheet.

[Click here to create a copy of the demo Google Sheet (the required GAS code will also be copied)](https://docs.google.com/spreadsheets/d/1pWz74IdsszZXgiQ0-Yi2ruTt3QMZmyRG1OLlpOomgYk/copy).

## Setup

1. Open a Google Sheet

2. Go to `Extensions > Apps Script`

3. Copy the code from `Code.gs` in this repository and paste it into the `Code.gs` file in the GAS editor

4. Copy the code from `download.html` in this repository and paste it into a new `download.html` file in the GAS editor (create a new file using the GAS editor)

5. Save the GAS project

## Usage

1. Refresh the Google Sheet

2. Wait for the Google Sheet to finish loading. There should now be an `📁 Archive` button on the Google Sheets menu

3. Press `📁 Archive > 🔥 Download CSV archive`
