const express = require('express');

const app = express();

// Including modules:
const index = require('./index/index');
const graphqlPractice = require('./graphql-practice/index');

app.use(index);
app.use(graphqlPractice);

module.exports = app;
