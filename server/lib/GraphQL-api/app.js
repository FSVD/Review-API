import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import multiViews from 'multi-views';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import executableSchema from './schema';

const app = express();

// App init set up
app.use(favicon(path.join(__dirname, '_public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '_public')));

// View engine with multi views set up
const viewDirs = [];
app.set('views', viewDirs);
app.set('view engine', 'hbs');
viewDirs.push(path.resolve(__dirname, 'lib/_common/views'));
multiViews.setupMultiViews(app);

// GraphQL endpoint and graphiql interface set up
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
