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

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const addTodo = async () => {
    if (task.trim()) {
      await addDoc(collection(db, "todos"), { task, completed: false });
      setTask("");
    }
  };

  const toggleCompletion = async (id, completed) => {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { completed: !completed });
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
          <button onClick={addTodo} className="add-button">
            Add
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span
                className={todo.completed ? "completed" : ""}
                onClick={() => toggleCompletion(todo.id, todo.completed)}
              >
                {todo.task}
              </span>
              <button onClick={() => deleteTodo(todo.id)} className="delete-button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Move NavBar below the To-Do List */}
      <NavBar />
    </div>
  );
}

export default ToDoList;
