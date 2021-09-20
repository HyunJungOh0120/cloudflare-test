const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const getFullUrl = (req) =>
  `${req.protocol}://${req.headers.host}${req.originalUrl}`;

app.use(function (req, res, next) {
  req.getUrl = getFullUrl(req);
  return next();
});

app.get('/*', (req, res) => {
  const headers = req.headers;
  const fullURL = req.getUrl;
  const method = req.method;

  console.log('user-agent🛠: ', req.headers['user-agent']);

  res.send({ method, fullURL, headers });
});

app.get('*', (req, res) => {
  res.send(req.headers);
});

module.exports = app;
