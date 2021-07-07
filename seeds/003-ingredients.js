exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("ingredients")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("ingredients").insert([
        { name: "cheese" },
        { name: "dough" },
        { name: "chicken" },
        { name: "beef" },
        { name: "lettuce" },
        { name: "taco shell" },
        { name: "noodles" },
        { name: "sauce" }
      ]);
    });
};
