exports.seed = function(knex) {
  return knex('resourceWall_resource_ratings').del()
    .then(function () {
      return Promise.all([
        knex('resourceWall_resource_ratings').insert({user_id: 1, resource_id: 1, rating: 5}),
        knex('resourceWall_resource_ratings').insert({user_id: 2, resource_id: 1, rating: 5}),
        knex('resourceWall_resource_ratings').insert({user_id: 2, resource_id: 4, rating: 5}),
        knex('resourceWall_resource_ratings').insert({user_id: 3, resource_id: 1, rating: 1}),
        knex('resourceWall_resource_ratings').insert({user_id: 1, resource_id: 2, rating: 3}),
        knex('resourceWall_resource_ratings').insert({user_id: 2, resource_id: 2, rating: 5}),
        knex('resourceWall_resource_ratings').insert({user_id: 2, resource_id: 1, rating: 2})
      ]);
    });
};