// src/components/NavBar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">To-Do App</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded text-white"
      >
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
