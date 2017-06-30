exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('review_rating_criterion_value', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('review_id').unsigned().notNull().references('review.id');
      table.integer('rating_criterion_id').unsigned().notNull().references('rating_criterion.id');
      table.integer('value').notNull();
      table.timestamps([], []);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('review_rating_criterion_value'),
  ]);
};
