/**
 * Google Apps Script: saves registrations from the website into this Google Sheet.
 * Setup steps are in README.md.
 */
const SHEET_NAME = 'Registrations';
const HEADERS = ['Timestamp', 'Ref', 'Name', 'WhatsApp', 'City', 'Experience', 'Practice days', 'Payment', '18+ & safety', 'Paid?', 'Notes'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#FF5A1F').setFontColor('#0A0A0C');
    sh.setFrozenRows(1);
  }
  return sh;
}

// Stops a value like "=HYPERLINK(...)" being run as a formula in the sheet.
function clean_(v, max) {
  let s = String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max || 100);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.company) return out_({ ok: true }); // honeypot
    if (!d.name || !/^03\d{2}-\d{7}$/.test(d.phone)) return out_({ ok: false, error: 'invalid' });
    sheet_().appendRow([
      new Date(), clean_(d.ref, 20), clean_(d.name, 80), clean_(d.phone, 16), clean_(d.city, 40),
      clean_(d.experience, 20), clean_(d.practice, 20), clean_(d.payment, 30), clean_(d.consent, 5), '', ''
    ]);
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Used by the website's optional "slots remaining" bar.
function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'count') {
    return out_({ count: Math.max(0, sheet_().getLastRow() - 1) });
  }
  return out_({ ok: true });
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
