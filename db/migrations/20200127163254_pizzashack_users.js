
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pizzashack_users', function (table) {
    table.increments('id');
    table.string('name');
    table.string('email');
    table.string('password');
    table.string('phone');
    table.boolean('admin')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pizzashack_users');
};
