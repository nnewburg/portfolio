exports.seed = function(knex) {
    return knex('resourceWall_keywords').del()
      .then(function () {
        return Promise.all([
          knex('resourceWall_keywords').insert({name: ' Food'}),
          knex('resourceWall_keywords').insert({name: ' Dogs'}),
          knex('resourceWall_keywords').insert({name: ' Animals'}),
          knex('resourceWall_keywords').insert({name: ' Travel'}),
          knex('resourceWall_keywords').insert({name: ' Magic'}),
          knex('resourceWall_keywords').insert({name: ' Social Media'}),
          knex('resourceWall_keywords').insert({name: ' Presents'}),
          knex('resourceWall_keywords').insert({name: ' Shopping'}),
        ]);
      });
  }