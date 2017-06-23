import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import multiViews from 'multi-views';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import executableSchema from './schema';

const app = express();

// View engine setup for multiple views
const viewDirs = [];
app.set('views', viewDirs);
app.set('view engine', 'hbs');
viewDirs.push(path.resolve(__dirname, 'views'));
viewDirs.push(path.resolve(__dirname, '../_common/views'));
multiViews.setupMultiViews(app);

// Setting up graphql endpoint and graphiql interface
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

module.exports = app;
