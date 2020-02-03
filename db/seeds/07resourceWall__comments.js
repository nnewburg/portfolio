
  exports.seed = function(knex) {
    return knex('resourceWall_comments').del()
      .then(function () {
        return Promise.all([
          knex('resourceWall_comments').insert({user_id: 1, resource_id: 1, content: "Weird"}),
          knex('resourceWall_comments').insert({user_id: 1, resource_id: 2, content: 'Thanks for the info'}),
          knex('resourceWall_comments').insert({user_id: 2, resource_id: 3, content: 'SO CUTE!!!'})
        ]);
      });
  }