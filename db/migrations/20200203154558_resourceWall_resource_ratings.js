
exports.up = function(knex) {
  return knex.schema.createTable('resourceWall_resource_ratings', function(table){
      table.increments('id');
      table.integer('user_id').unsigned().notNullable();
      table.integer('resource_id').unsigned().notNullable();
      table.integer('rating');
      table.foreign('user_id').references('id').inTable('resourceWall_users');
      table.foreign('resource_id').references('id').inTable('resourceWall_resources');
    })
};

exports.down = function(knex) {
 return knex.schema.dropTable('resourceWall_resource_ratings')
};
