
exports.up = function(knex) {
  return knex.schema.createTable('tinyapp_users', function (table) {
    table.increments('id');
    table.string('email');
    table.string('password');
    table.string('cookieid');
  });
};

exports.down = function(knex) {
   return knex.schema.dropTable('tinyapp_users');
};
