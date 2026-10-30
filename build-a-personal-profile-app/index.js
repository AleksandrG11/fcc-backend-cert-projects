'use strict';
const express = require('express');
const app = express();
app.disable('x-powered-by');
const profile = Object.freeze({
  name: 'Camper Bot',
  hobbies: ['cycling', 'boating', 'guitar'],
  skills: ['JavaScript', 'Node.js', 'Express.js']
});
app.get('/', (_req, res) => res.send("Welcome to Camper Bot's homepage!"));
app.get('/hobbies', (_req, res) => res.send('I cycle, go boating, and play guitar.'));
app.get('/skills', (_req, res) => res.send('JavaScript, Node.js, and Express.js!'));
app.get('/api/profile', (_req, res) => res.json(profile));
if (require.main === module) app.listen(Number(process.env.PORT) || 3000);
module.exports = app;
