'use strict';
const express = require('express');
const app = express();
app.disable('x-powered-by');
function parseDate(value) {
  if (value === undefined || value === '') return new Date();
  const normalized = /^-?\d+$/.test(value) ? Number(value) : value;
  return new Date(normalized);
}
app.get('/api/:date?', (req,res) => {
 const date=parseDate(req.params.date);
 if(Number.isNaN(date.getTime())) return res.json({error:'Invalid Date'});
 return res.json({unix:date.getTime(),utc:date.toUTCString()});
});
if(require.main === module) app.listen(Number(process.env.PORT)||3000);
module.exports={app,parseDate};
