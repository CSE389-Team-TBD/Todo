// src/components/ToDoList.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import NavBar from "./NavBar";
import "../styles/ToDoList.css";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Not at all Important");

  // Define priority order for sorting
  const priorityOrder = {
    "Very Important": 1,
    "Fairly Important": 2,
    "Important": 3,
    "Slightly Important": 4,
    "Not at all Important": 5,
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort tasks by priority
      const sortedTodos = todosData.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );

      setTodos(sortedTodos);
    });
    return unsubscribe;
  }, []);

  const addTodo = async () => {
    if (task.trim()) {
      await addDoc(collection(db, "todos"), {
        task,
        completed: false,
        priority,
      });
      setTask("");
      setPriority("Not at all Important");
    }
  };

  const toggleCompletion = async (id, completed) => {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { completed: !completed });
  };

  const updatePriority = async (id, newPriority) => {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { priority: newPriority });

    // Re-sort todos after updating priority
    setTodos((prevTodos) =>
      [...prevTodos].sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      )
    );
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="todo-container">
      <div className="todo-content">
        <h1>Your To-Do List</h1>
        <div className="todo-input">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a new task"
            className="task-input"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="Very Important">Very Important</option>
            <option value="Fairly Important">Fairly Important</option>
            <option value="Important">Important</option>
            <option value="Slightly Important">Slightly Important</option>
            <option value="Not at all Important">Not at all Important</option>
          </select>
          <button onClick={addTodo} className="add-button">
            Add
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className="task-details">
                <span
                  className={todo.completed ? "completed" : ""}
                  onClick={() => toggleCompletion(todo.id, todo.completed)}
                >
                  {todo.task}
                </span>
                <div className="priority-container">
                  <p className="priority-label">Priority:</p>
                  <select
                    value={todo.priority || "Not at all Important"}
                    onChange={(e) => updatePriority(todo.id, e.target.value)}
                    className="priority-select"
                  >
                    <option value="Very Important">Very Important</option>
                    <option value="Fairly Important">Fairly Important</option>
                    <option value="Important">Important</option>
                    <option value="Slightly Important">
                      Slightly Important
                    </option>
                    <option value="Not at all Important">
                      Not at all Important
                    </option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <NavBar />
    </div>
  );
}

export default ToDoList;
