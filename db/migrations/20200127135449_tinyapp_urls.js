
exports.up = function(knex) {
  return knex.schema.createTable('tinyapp_urls', function (table) {
    table.increments('id');
    table.string('longurl');
    table.string('shorturl');
    table.string('userid');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tinyapp_urls');
};
