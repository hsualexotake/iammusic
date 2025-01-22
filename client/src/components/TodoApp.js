import React from "react";
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";

const TodoApp = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-5">PERN Todo List</h1>
      <InputTodo />
      <ListTodos />
    </div>
  );
};

export default TodoApp;
