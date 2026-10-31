'use strict';
const express = require('express');
const app = express();
app.disable('x-powered-by');
function parseDate(value) {
  if (value === undefined || value === '') return new Date();
  if (/^-?\d+$/.test(value)) return new Date(Number(value));
  // The issuer's human-readable date test expects UTC midnight even on
  // machines whose local time zone is not UTC.
  if (/^(?:\d{1,2}\s+[A-Za-z]+\s+\d{4}|[A-Za-z]+\s+\d{1,2},?\s+\d{4})$/.test(value)) {
    return new Date(value + ' GMT');
  }
  return new Date(value);
}
app.get('/api/:date?', (req,res) => {
 const date=parseDate(req.params.date);
 if(Number.isNaN(date.getTime())) return res.json({error:'Invalid Date'});
 return res.json({unix:date.getTime(),utc:date.toUTCString()});
});
if(require.main === module) app.listen(Number(process.env.PORT)||8000);
module.exports={app,parseDate};
