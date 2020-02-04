exports.seed = function(knex) {
  return knex('resourcewall_users').del()
    .then(function () {
      return Promise.all([
        knex('resourcewall_users').insert({name: 'Dr. Facilier', email:'voodooman@gmail.com', password:'1', profile_image:''}),
        knex('resourcewall_users').insert({name: 'Buzz Lightyear', email:'buzzbuzz@gmail.com', password:'1', profile_image:''}),
        knex('resourcewall_users').insert({name: 'Christopher Robin', email:'goodpooh@gmail.com', password:'1', profile_image:''}),
      ]);
    });
}