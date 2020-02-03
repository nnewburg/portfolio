
exports.up = function(knex) {
  return knex.schema.createTable('resourceWall_user_likes', function(table){
      table.increments('id');
      table.integer('user_id').unsigned().notNullable();
      table.integer('resource_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('resourceWall_users');
      table.foreign('resource_id').references('id').inTable('resourceWall_resources');
    })

};

exports.down = function(knex) {
   return knex.schema.dropTable('resourceWall_user_likes');
};
