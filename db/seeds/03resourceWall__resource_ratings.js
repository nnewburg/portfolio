exports.seed = function(knex) {
  return knex('resourcewall_resource_ratings').del()
    .then(function () {
      return Promise.all([
        knex('resourcewall_resource_ratings').insert({user_id: 1, resource_id: 1, rating: 5}),
        knex('resourcewall_resource_ratings').insert({user_id: 2, resource_id: 1, rating: 5}),
        knex('resourcewall_resource_ratings').insert({user_id: 2, resource_id: 4, rating: 5}),
        knex('resourcewall_resource_ratings').insert({user_id: 3, resource_id: 1, rating: 1}),
        knex('resourcewall_resource_ratings').insert({user_id: 1, resource_id: 2, rating: 3}),
        knex('resourcewall_resource_ratings').insert({user_id: 2, resource_id: 2, rating: 5}),
        knex('resourcewall_resource_ratings').insert({user_id: 2, resource_id: 1, rating: 2})
      ]);
    });
};