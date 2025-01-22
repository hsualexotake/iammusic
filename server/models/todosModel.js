const pool = require("../db");

// Fetch all todos
const fetchTodos = async () => {
  const result = await pool.query("SELECT * FROM temptodo");
  return result.rows;
};

// Fetch a specific todo by ID
const fetchTodoById = async (id) => {
  const result = await pool.query("SELECT * FROM temptodo WHERE todo_id = $1", [
    id,
  ]);
  return result.rows[0];
};

// Insert a new todo
const insertTodo = async (description) => {
  const result = await pool.query(
    "INSERT INTO temptodo (description) VALUES ($1) RETURNING *",
    [description]
  );
  return result.rows[0];
};

// Update a todo
const modifyTodo = async (id, description) => {
  await pool.query("UPDATE temptodo SET description = $1 WHERE todo_id = $2", [
    description,
    id,
  ]);
};

// Delete a todo
const removeTodo = async (id) => {
  await pool.query("DELETE FROM temptodo WHERE todo_id = $1", [id]);
};

module.exports = {
  fetchTodos,
  fetchTodoById,
  insertTodo,
  modifyTodo,
  removeTodo,
};
