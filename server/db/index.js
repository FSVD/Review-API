const config = require('./knexfile');
export const knex = require('knex')(config[process.env.NODE_ENV]);

knex.migrate.latest([config]);

const bookshelf = require('bookshelf')(knex);
const cascadeDelete = require('bookshelf-cascade-delete');

bookshelf.plugin(cascadeDelete); // Provide cascade delete
bookshelf.plugin('registry'); // Avoid circular dependency among models

export default bookshelf; // Export module bookshelf for access to db connection
