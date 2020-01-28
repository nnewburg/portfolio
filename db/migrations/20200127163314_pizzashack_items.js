
exports.up = function(knex, Promise) {
  // return Promise.all([
   return knex.schema.createTable('pizzashack_items', function(table){
      table.increments('id');
      table.integer('price');
      table.string('description');
      table.string('size');
    })

  // ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pizzashack_items');
};
