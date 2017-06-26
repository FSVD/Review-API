const config = require('./knexfile');
const knex = require('knex')(config[process.env.NODE_ENV]);

knex.migrate.latest([config]);

module.exports = knex; // Export module knex for access to db connection
