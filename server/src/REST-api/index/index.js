const express = require('express');
const path = require('path');

// Add support for rendering views from multiple directories
const multiViews = require('multi-views');

const app = express();

// Router setup
const index = require('./index.router');

index.configure(app);

// View engine setup for multiple views
const viewDirs = [];
app.set('views', viewDirs);
app.set('view engine', 'hbs');
viewDirs.push(path.resolve(__dirname, 'views'));
viewDirs.push(path.resolve(__dirname, '../_common/views'));
multiViews.setupMultiViews(app);

module.exports = app;
