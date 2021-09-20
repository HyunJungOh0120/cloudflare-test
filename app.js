const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const getFullUrl = (req) =>
  `${req.protocol}://${req.headers.host}${req.originalUrl}`;

app.use(function (req, res, next) {
  req.getUrl = getFullUrl(req);
  return next();
});

app.get('*', (req, res) => {
  res.send({ fullURL: req.getUrl, headers: req.headers });
});

app.get('/', function (req, res) {
  res.send({ hi: 'hi' });
});

module.exports = app;
