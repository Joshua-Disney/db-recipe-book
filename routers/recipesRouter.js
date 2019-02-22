const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await db("recipes");
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve recipe data"
    });
  }
});

// Get recipe by id
router.get("/:id", async (req, res) => {
  try {
    const recipe = await db("recipes as r")
      .join("dishes as d", "d.id", "r.dish_id")
      .select("r.id", "r.name", "d.name as dish")
      .where("r.id", req.params.id)
      .first();

    const ingredientList = await db("recipe_ingredients as ri")
      .join("ingredients as i", "ri.ingredient_id", "i.id")
      .select("i.name")
      .where("ri.recipe_id", recipe.id);
    if (recipe) {
      res.status(200).json({ ...recipe, ingredientList });
      console.log(ingredientList);
    } else {
      res.status(404).json({
        message: "The recipe with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve recipe data"
    });
  }
});

// Create new recipe
router.post("/", async (req, res) => {
  try {
    const [id] = await db("recipes").insert(req.body);
    const recipe = await db("recipes")
      .where({ id })
      .first();
    res.status(201).json({
      recipe,
      message: "Successfully created recipe data"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to create recipe data"
    });
  }
});

// Update existing recipe
router.put("/:id", async (req, res) => {
  try {
    const count = await db("recipes")
      .where({ id: req.params.id })
      .update(req.body);
    if (count > 0) {
      const recipe = await db("recipes")
        .where({ id: req.params.id })
        .first();
      res.status(200).json({
        recipe,
        message: "Successfully updated recipe data"
      });
    } else {
      res.status(404).json({
        message: "The recipe with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to update recipe data"
    });
  }
});

// Delete existing recipe
router.delete("/:id", async (req, res) => {
  try {
    const count = await db("recipes")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: "The recipe with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to delete recipe data"
    });
  }
});

module.exports = router;
