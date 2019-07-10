exports.up = async knex => {

  await knex.schema.createTable('user', (table) => {
    table.increments('id').unsigned().primary();
    table.string('username').notNull();
    table.string('first_name');
    table.string('last_name');
    table.string('password').notNull();
    table.string('email').notNull();
    table.string('city');
    table.boolean('newsletter_agree').notNull();
    table.integer('user_account_status').notNull();
    table.timestamps([], []);
  }),

  await knex.schema.createTable('subject_category', (table) => {
    table.increments('id').unsigned().primary();
    table.string('name').notNull();
    table.timestamps([], []);
  }),

  await knex.schema.createTable('subject', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('subject_category_id').unsigned().notNull().references('subject_category.id');
    table.string('google_places_reference').notNull();
    table.timestamps([], []);
  }),

  await knex.schema.createTable('review', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('user_id').unsigned().notNull().references('user.id');
    table.integer('subject_id').unsigned().notNull().references('subject.id');
    table.string('title').notNull();
    table.string('content').notNull();
    table.integer('review_status').notNull();
    table.timestamps([], []);
  }),

  await knex.schema.createTable('rating_criterion', (table) => {
    table.increments('id').unsigned().primary();
    table.string('name').notNull();
    table.timestamps([], []);
  }),

  await knex.schema.createTable('subject_category_rating_criterion', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('subject_category_id').unsigned().notNull().references('subject_category.id');
    table.integer('rating_criterion_id').unsigned().notNull().references('rating_criterion.id');
    table.timestamps([], []);
  }),

  await knex.schema.createTable('review_evaluation', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('type').notNull();
    table.integer('user_id').unsigned().notNull().references('user.id');
    table.integer('review_id').unsigned().notNull().references('review.id');
    table.timestamps([], []);
  })
};

exports.down = async knex => {
  await knex.schema.dropTable('user'),
  await knex.schema.dropTable('subject'),
  await knex.schema.dropTable('subject_category'),
  await knex.schema.dropTable('review'),
  await knex.schema.dropTable('rating_criterion'),
  await knex.schema.dropTable('subject_category_rating_criterion'),
  await knex.schema.dropTable('review_evaluation')
};
