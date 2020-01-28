exports.seed = function(knex, Promise) {
  return knex('pizzashack_items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({description: 'Pepperoni', price: 10}),
        knex('items').insert({description: 'Wings', price: 5}),
        knex('items').insert({description: 'Vegetarian', price: 13}),
        knex('items').insert({description: 'Bread', price: 3}),
      ]);
    });
}