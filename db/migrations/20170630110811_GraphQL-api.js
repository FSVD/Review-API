exports.up = async knex => {
	await knex.schema.createTable('review_rating_criterion_value', (table) => {
		table.increments('id').unsigned().primary();
		table.integer('review_id').unsigned().notNull().references('review.id');
		table.integer('rating_criterion_id').unsigned().notNull().references('rating_criterion.id');
		table.integer('value').notNull();
		table.timestamps([], []);
	})
};

exports.down = async knex => {
	await knex.schema.dropTable('review_rating_criterion_value')
};
