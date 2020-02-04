exports.seed = function(knex) {
    return knex('resourcewall_keywords').del()
      .then(function () {
        return Promise.all([
          knex('resourcewall_keywords').insert({name: ' Food'}),
          knex('resourcewall_keywords').insert({name: ' Dogs'}),
          knex('resourcewall_keywords').insert({name: ' Animals'}),
          knex('resourcewall_keywords').insert({name: ' Travel'}),
          knex('resourcewall_keywords').insert({name: ' Magic'}),
          knex('resourcewall_keywords').insert({name: ' Social Media'}),
          knex('resourcewall_keywords').insert({name: ' Presents'}),
          knex('resourcewall_keywords').insert({name: ' Shopping'}),
        ]);
      });
  }