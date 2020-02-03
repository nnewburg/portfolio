
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('resourceWall_resource_keywords', function(table){
      table.increments('id');
      table.integer('keyword_id').unsigned().notNullable();
      table.integer('resource_id').unsigned().notNullable();
      table.foreign('keyword_id').references('id').inTable('resourceWall_keywords');
      table.foreign('resource_id').references('id').inTable('resourceWall_resources');
    })
  ])
};

exports.down = function(knex) {
  return knex.schema.dropTable('resourceWall_resource_keywords');
};
