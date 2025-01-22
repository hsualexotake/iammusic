const {
  fetchTodos,
  fetchTodoById,
  insertTodo,
  modifyTodo,
  removeTodo,
} = require("../models/todosModel");

// Controller for getting all todos
const getTodos = async (req, res) => {
  try {
    const todos = await fetchTodos();
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Controller for getting a specific todo by ID
const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await fetchTodoById(id);
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Controller for creating a new todo
const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await insertTodo(description);
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Controller for updating a todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await modifyTodo(id, description);
    res.json({ message: "Todo updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Controller for deleting a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await removeTodo(id);
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
