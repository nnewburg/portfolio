
  exports.seed = function(knex) {
    return knex('resourcewall_resource_keywords').del()
      .then(function () {
        return Promise.all([
          knex('resourcewall_resource_keywords').insert({keyword_id: 2, resource_id: 1}),
          knex('resourcewall_resource_keywords').insert({keyword_id: 5, resource_id: 2}),
          knex('resourcewall_resource_keywords').insert({keyword_id: 5, resource_id: 3}),
          knex('resourcewall_resource_keywords').insert({keyword_id: 4, resource_id: 5}),
          knex('resourcewall_resource_keywords').insert({keyword_id: 3, resource_id: 6}),
          knex('resourcewall_resource_keywords').insert({keyword_id: 5, resource_id: 2}),
          knex('resourcewall_resource_keywords').insert({keyword_id: 6, resource_id: 4}),
          knex('resourcewall_resource_keywords').insert({keyword_id: 7, resource_id: 4}),
        ]);
      });
  }