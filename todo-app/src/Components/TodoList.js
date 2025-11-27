import React, { useState, useEffect } from "react";
export default function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks in localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  // Toggle complete
  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container mt-5 col-md-6">
      <h2 className="text-center mb-4">To-Do List</h2>
      <p className="text-center mb-3 ">This is To do List App , its helpful to manage your work  on Time.</p>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <hr></hr>
        <br></br>

        
        <button className="btn1" onClick={addTask}>
          Add
        </button>
      </div>

      <ul className="list-group">
        {tasks.map((t, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              t.completed ? "list-group-item-success" : ""
            }`}
          >
            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleComplete(index)}
            >
              {t.text}
            </span>
            <br></br>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteTask(index)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

