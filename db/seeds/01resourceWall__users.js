exports.seed = function(knex) {
  return knex('resourceWall_users').del()
    .then(function () {
      return Promise.all([
        knex('resourceWall_users').insert({name: 'Dr. Facilier', email:'voodooman@gmail.com', password:'1', profile_image:''}),
        knex('resourceWall_users').insert({name: 'Buzz Lightyear', email:'buzzbuzz@gmail.com', password:'1', profile_image:''}),
        knex('resourceWall_users').insert({name: 'Christopher Robin', email:'goodpooh@gmail.com', password:'1', profile_image:''}),
      ]);
    });
}