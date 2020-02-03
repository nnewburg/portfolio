
  exports.seed = function(knex) {
    return knex('resourceWall_resource_keywords').del()
      .then(function () {
        return Promise.all([
          knex('resourceWall_resource_keywords').insert({keyword_id: 2, resource_id: 1}),
          knex('resourceWall_resource_keywords').insert({keyword_id: 5, resource_id: 2}),
          knex('resourceWall_resource_keywords').insert({keyword_id: 5, resource_id: 3}),
          knex('resourceWall_resource_keywords').insert({keyword_id: 4, resource_id: 5}),
          knex('resourceWall_resource_keywords').insert({keyword_id: 3, resource_id: 6}),
          knex('resourceWall_resource_keywords').insert({keyword_id: 5, resource_id: 2}),
          knex('resourceWall_resource_keywords').insert({keyword_id: 6, resource_id: 4}),
          knex('resourceWall_resource_keywords').insert({keyword_id: 7, resource_id: 4}),
        ]);
      });
  }