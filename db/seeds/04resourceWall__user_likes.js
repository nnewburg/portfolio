
  exports.seed = function(knex) {
    return knex('resourcewall_user_likes').del()
      .then(function () {
        return Promise.all([
          knex('resourcewall_user_likes').insert({user_id: 1, resource_id: 1}),
          knex('resourcewall_user_likes').insert({user_id: 2, resource_id: 1}),
          knex('resourcewall_user_likes').insert({user_id: 3, resource_id: 1}),
          knex('resourcewall_user_likes').insert({user_id: 1, resource_id: 6}),
          knex('resourcewall_user_likes').insert({user_id: 2, resource_id: 6}),
          knex('resourcewall_user_likes').insert({user_id: 3, resource_id: 6}),
          knex('resourcewall_user_likes').insert({user_id: 1, resource_id: 5}),
          knex('resourcewall_user_likes').insert({user_id: 2, resource_id: 5}),
          knex('resourcewall_user_likes').insert({user_id: 1, resource_id: 4}),
          knex('resourcewall_user_likes').insert({user_id: 2, resource_id: 4}),
          knex('resourcewall_user_likes').insert({user_id: 3, resource_id: 4}),
          knex('resourcewall_user_likes').insert({user_id: 3, resource_id: 2}),
          knex('resourcewall_user_likes').insert({user_id: 2, resource_id: 2}),
          knex('resourcewall_user_likes').insert({user_id: 2, resource_id: 1})
        ]);
      });
  }