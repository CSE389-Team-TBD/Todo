import React from 'react';
import './Task.css'; // Add styles specific to tasks

function Task({ task, onComplete, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span onClick={() => onComplete(task.id)}>{task.name}</span>
      <button className="delete-button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default Task;
