
  exports.seed = function(knex) {
    return knex('resourcewall_comments').del()
      .then(function () {
        return Promise.all([
          knex('resourcewall_comments').insert({user_id: 1, resource_id: 1, content: "Weird"}),
          knex('resourcewall_comments').insert({user_id: 1, resource_id: 2, content: 'Thanks for the info'}),
          knex('resourcewall_comments').insert({user_id: 2, resource_id: 3, content: 'SO CUTE!!!'})
        ]);
      });
  }