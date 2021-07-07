const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const dishesRouter = require("./routers/dishesRouter.js");
const recipesRouter = require("./routers/recipesRouter.js");
const ingredientsRouter = require("./routers/ingredientsRouter.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api/dishes", dishesRouter);
server.use("/api/recipes", recipesRouter);
server.use("/api/ingredients", ingredientsRouter);

module.exports = server;
