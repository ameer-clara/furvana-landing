/**
 * Furvana waitlist — Google Apps Script Web App.
 *
 * Receives JSON POSTs from the Furvana landing page Server Action and appends
 * one row per signup to the bound Google Sheet. Returns the row number so the
 * UI can show "You're #N in line".
 *
 * Setup
 * 1. Create a Google Sheet. Open Extensions → Apps Script and paste this file.
 * 2. Run `setupHeaders` once from the Apps Script editor to write column titles.
 * 3. Deploy → New deployment → type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Copy the resulting /exec URL.
 * 4. In Vercel project settings → Environment Variables, add:
 *      WAITLIST_WEBHOOK_URL = <that /exec URL>
 *    Redeploy the landing page.
 *
 * Sharing with the team: just share the Sheet — they see signups live.
 *
 * Re-deploying: each code change requires a new deployment version, but the
 * /exec URL stays the same if you "Manage deployments" → edit the existing one.
 */

var HEADERS = [
  "Timestamp",
  "Email",
  "Breed",
  "Species",
  "Fits current arch",
  "Source",
];

function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var email = String(payload.email || "").trim().toLowerCase();
    if (!email || email.indexOf("@") < 0) {
      return json({ ok: false, error: "Invalid email" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      email,
      payload.breed || "",
      payload.species || "",
      payload.fits || "",
      payload.source || "",
    ]);

    // Row 2 is the first signup, so pos = lastRow - 1 (header is row 1).
    var pos = sheet.getLastRow() - 1;
    return json({ ok: true, pos: pos });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  // Friendly response so anyone hitting the URL in a browser sees something.
  return json({ ok: true, hint: "POST JSON {email, breed, species, fits} to add a signup" });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
