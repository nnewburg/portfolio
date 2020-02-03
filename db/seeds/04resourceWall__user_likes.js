
  exports.seed = function(knex) {
    return knex('resourceWall_user_likes').del()
      .then(function () {
        return Promise.all([
          knex('resourceWall_user_likes').insert({user_id: 1, resource_id: 1}),
          knex('resourceWall_user_likes').insert({user_id: 2, resource_id: 1}),
          knex('resourceWall_user_likes').insert({user_id: 3, resource_id: 1}),
          knex('resourceWall_user_likes').insert({user_id: 1, resource_id: 6}),
          knex('resourceWall_user_likes').insert({user_id: 2, resource_id: 6}),
          knex('resourceWall_user_likes').insert({user_id: 3, resource_id: 6}),
          knex('resourceWall_user_likes').insert({user_id: 1, resource_id: 5}),
          knex('resourceWall_user_likes').insert({user_id: 2, resource_id: 5}),
          knex('resourceWall_user_likes').insert({user_id: 1, resource_id: 4}),
          knex('resourceWall_user_likes').insert({user_id: 2, resource_id: 4}),
          knex('resourceWall_user_likes').insert({user_id: 3, resource_id: 4}),
          knex('resourceWall_user_likes').insert({user_id: 3, resource_id: 2}),
          knex('resourceWall_user_likes').insert({user_id: 2, resource_id: 2}),
          knex('resourceWall_user_likes').insert({user_id: 2, resource_id: 1})
        ]);
      });
  }