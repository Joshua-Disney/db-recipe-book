const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

// Get all ingredients
router.get("/", async (req, res) => {
  try {
    const ingredients = await db("ingredients");
    res.status(200).json(ingredients);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve ingredient data"
    });
  }
});

// Get ingredient by id
router.get("/:id", async (req, res) => {
  try {
    const ingredient = await db("ingredients")
      .where({ id: req.params.id })
      .first();
    if (ingredient) {
      res.status(200).json(ingredient);
    } else {
      res.status(404).json({
        message: "The ingredient with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve ingredient data"
    });
  }
});

// Create new ingredient
router.post("/", async (req, res) => {
  try {
    const [id] = await db("ingredients").insert(req.body);
    const ingredient = await db("ingredients")
      .where({ id })
      .first();
    res.status(201).json({
      ingredient,
      message: "Successfully created ingredient data"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to create ingredient data"
    });
  }
});

// Update existing ingredient
router.put("/:id", async (req, res) => {
  try {
    const count = await db("ingredients")
      .where({ id: req.params.id })
      .update(req.body);
    if (count > 0) {
      const ingredient = await db("ingredients")
        .where({ id: req.params.id })
        .first();
      res.status(200).json({
        ingredient,
        message: "Successfully updated ingredient data"
      });
    } else {
      res.status(404).json({
        message: "The ingredient with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to update ingredient data"
    });
  }
});

// Delete existing ingredient
router.delete("/:id", async (req, res) => {
  try {
    const count = await db("ingredients")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: "The ingredient with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to delete ingredient data"
    });
  }
});

module.exports = router;
