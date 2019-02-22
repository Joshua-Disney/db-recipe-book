exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("recipes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("recipes").insert([
        { name: "Chicken tacos", dish_id: 1 },
        { name: "Beef tacos", dish_id: 1 },
        { name: "Spaghetti", dish_id: 2 }
      ]);
    });
};
