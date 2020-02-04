
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('resourcewall_resources', function(table){
      table.increments('id');
      table.string('title');
      table.string('url');
      table.string('image');
      table.string('description');
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('resourcewall_users');
    })

  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('resourcewall_resources')

  ])
};
