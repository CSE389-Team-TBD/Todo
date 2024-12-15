// src/components/ToDoList.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const listVariants = {
    hidden: { opacity: 0, y: 20 }, // Animation for when items are entering
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8 }, // Animation for when items are exiting
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8 dark:bg-slate-900">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md dark:bg-slate-800">
      <motion.div
        className="flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-3xl mb-6 text-center text-gray-800 dark:text-white">Your To-Do List</h1>
        </motion.div>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a new task"
            className="flex-grow p-3 border border-gray-300 rounded-md text-base dark:bg-slate-900 dark:text-white"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-1 text-sm border border-gray-300 rounded-md bg-white cursor-pointer dark:bg-slate-900 dark:text-white"
          >
            <option value="Very Important">Very Important</option>
            <option value="Fairly Important">Fairly Important</option>
            <option value="Important">Important</option>
            <option value="Slightly Important">Slightly Important</option>
            <option value="Not at all Important">Not at all Important</option>
          </select>
          <button onClick={addTodo} className="px-4 py-3 bg-green-600  text-white border-none rounded-md text-base cursor-pointer transition-colors duration-300 hover:bg-green-700">
            Add
          </button>
        </div>

        
        {/* Animated Todo List */}
        <ul className="list-none p-0 m-0">
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.li
                key={todo.id}
                className="flex items-center justify-between py-4 px-3 border-b border-gray-300 last:border-b-0"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col gap-1 flex-grow">
                  <span
                    className={
                      todo.completed
                        ? "line-through text-gray-500 dark:text-slate-400 text-lg"
                        : "dark:text-white text-lg"
                    }
                    onClick={() =>
                      toggleCompletion(todo.id, todo.completed)
                    }
                  >
                    {todo.task}
                  </span>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      Priority:
                    </p>
                    <select
                      value={todo.priority || "Not at all Important"}
                      onChange={(e) =>
                        updatePriority(todo.id, e.target.value)
                      }
                      className="p-1 text-sm rounded-md bg-white cursor-pointer dark:bg-slate-700 dark:text-white"
                    >
                      <option value="Very Important">Very Important</option>
                      <option value="Fairly Important">
                        Fairly Important
                      </option>
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
                  className="px-5 py-3 text-base font-bold text-white bg-red-500 border-none rounded-lg cursor-pointer transition-transform transform duration-200 ease-in-out hover:bg-red-600 hover:scale-105 active:scale-95"
                >
                  Delete
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
      <NavBar />
    </div>
  );
}

export default ToDoList;
