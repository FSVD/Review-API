import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import multiViews from 'multi-views';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import executableSchema from './schema';
import schemaMap from './schema.map';

const app = express();

// Enable CORS for allowed domains
const whitelist = [
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    try {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        throw new Error('Domain not allowed by CORS');
      }
    } catch (error) {
      console.log(error.message);
      callback(error.message);
    }
  },
};

app.use(cors(corsOptions));

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
viewDirs.push(path.resolve(__dirname, '_common/views'));
multiViews.setupMultiViews(app);

// GraphQL endpoint and graphiql interface set up
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${process.env.PROCESS_PORT}/subscriptions`,
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
