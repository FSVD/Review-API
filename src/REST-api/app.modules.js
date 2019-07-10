const express = require('express');
const app = express();

// Including modules:
const index = require('./index/index');

app.use(index);

module.exports = app;
