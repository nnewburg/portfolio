exports.seed = function(knex) {
  return knex('pizzashack_items').del()
    .then(function () {
      return Promise.all([
        knex('pizzashack_items').insert({description: 'Pepperoni', price: 10}),
        knex('pizzashack_items').insert({description: 'Wings', price: 5}),
        knex('pizzashack_items').insert({description: 'Vegetarian', price: 13}),
        knex('pizzashack_items').insert({description: 'Bread', price: 3}),
      ]);
    });
}