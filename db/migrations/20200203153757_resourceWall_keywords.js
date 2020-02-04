
exports.up = function(knex) {
   return knex.schema.createTable('resourcewall_keywords', function(table){
      table.increments('id');
      table.string('name');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('resourcewall_keywords');
};
