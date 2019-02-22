const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

// Get all dishes
router.get("/", async (req, res) => {
  try {
    const dishes = await db("dishes");
    res.status(200).json(dishes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve dish data"
    });
  }
});

// Get dish by id
router.get("/:id", async (req, res) => {
  try {
    const dish = await db("dishes")
      .where({ id: req.params.id })
      .first();
    if (dish) {
      res.status(200).json(dish);
    } else {
      res.status(404).json({
        message: "The dish with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve dish data"
    });
  }
});

// Get all students in a dish
router.get("/:id/students", async (req, res) => {
  try {
    const dishesutdents = await db("students as s")
      .join("dishes as d", "d.id", "s.dish_id")
      .select("s.id", "s.name", "d.name as dish")
      .where("s.dish_id", req.params.id);
    if (dishesutdents) {
      res.status(200).json(dishesutdents);
    } else {
      res.status(404).json({
        message: "The dish with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve dish data"
    });
  }
});

// Create new dish
router.post("/", async (req, res) => {
  try {
    const [id] = await db("dishes").insert(req.body);
    const dish = await db("dishes")
      .where({ id })
      .first();
    res.status(201).json({
      dish,
      message: "Successfully created dish data"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to create dish data"
    });
  }
});

// Update existing dish
router.put("/:id", async (req, res) => {
  try {
    const count = await db("dishes")
      .where({ id: req.params.id })
      .update(req.body);
    if (count > 0) {
      const dish = await db("dishes")
        .where({ id: req.params.id })
        .first();
      res.status(200).json({
        dish,
        message: "Successfully updated dish data"
      });
    } else {
      res.status(404).json({
        message: "The dish with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to update dish data"
    });
  }
});

// Delete existing dish
router.delete("/:id", async (req, res) => {
  try {
    const count = await db("dishes")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: "The dish with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to delete dish data"
    });
  }
});

module.exports = router;
