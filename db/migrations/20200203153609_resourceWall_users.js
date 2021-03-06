exports.up = function(knex) {
  return knex.schema.createTable('resourcewall_users', function (table) {
    table.increments('id');
    table.string('name');
    table.string('email');
    table.string('password');
    table.string('profile_image');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('resourcewall_users');
};
