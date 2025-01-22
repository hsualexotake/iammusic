const express = require("express");
const router = express.Router();
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosController");

// Route to get all todos
router.get("/", getTodos);

// Route to get a specific todo by ID
router.get("/:id", getTodo);

// Route to create a new todo
router.post("/", createTodo);

// Route to update an existing todo
router.put("/:id", updateTodo);

// Route to delete a todo
router.delete("/:id", deleteTodo);

module.exports = router;
