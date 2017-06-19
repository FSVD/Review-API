const GraphHTTP = require('express-graphql');
const Schema = require('./graphqlPractice.schema');

function Http() {
  this.configure = function (app) {
    // GraphQL
    app.use('/graphql', GraphHTTP({
      schema: Schema,
      pretty: true,
      graphiql: true,
    }));
  };
}

module.exports = new Http();
