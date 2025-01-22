import React, { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/"; // Refresh the page after adding a todo
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form className="d-flex mt-5" onSubmit={onSubmitForm}>
      <input
        type="text"
        className="form-control"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a new todo"
      />
      <button className="btn btn-success ml-2">Add</button>
    </form>
  );
};

export default InputTodo;
