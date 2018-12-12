'use strict';

const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} request made to "${req.path}" from "${req.ip}" `);
  next();
});

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.sendFile(`${__dirname}/views/index.html`));

app.get('/api/timestamp/:date_string', (req, res) => {
  const input = req.params.date_string;
  const response = { unix: 0, utc: '' };
  
  let date;
  
  if (input.match(/\D/)) {
    // NaN
    date = new Date(input);
  } else {
    date = new Date(Number(input));
  }
  
  response.unix = date.getTime();
  response.utc = date.toUTCString();

  if (!response.unix) {
    return res.json({ error: 'Invalid Date' });
  }
  
  return res.json(response);
});

app.listen(process.env.PORT, () => {
  console.log(`App is now listening on port ${process.env.PORT}`);
});