// src/components/Auth.jsx

// Import necessary React and Firebase dependencies
import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// Import navigation hook from react-router-dom
import { useNavigate } from "react-router-dom";
// Import animation utilities from framer-motion
import { motion } from "framer-motion";

function Auth() {
  // State management for form inputs and authentication mode
  const [email, setEmail] = useState(""); // Stores email input value
  const [password, setPassword] = useState(""); // Stores password input value
  const [isSignUp, setIsSignUp] = useState(false); // Toggles between login and signup modes
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handler for both sign up and login functionality
  const handleAuth = async () => {
    try {
      if (isSignUp) {
        // Create new user if in signup mode
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Sign in existing user if in login mode
        await signInWithEmailAndPassword(auth, email, password);
      }
      // After successful authentication, navigate to todos page
      navigate("/todos");
    } catch (error) {
      // Show error message if authentication fails
      alert(error.message);
    }
  };

  return (
    // Main container with dark mode support
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 dark:bg-slate-900">
      {/* Animated container for form elements using framer-motion */}
      <motion.div
        className="flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Dynamic header that changes based on auth mode */}
        <h1 className="text-3xl mb-4 text-gray-800 dark:text-gray-100">
          {isSignUp ? "Sign Up" : "Log In"}
        </h1>
        {/* Email input field */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-72 p-3 my-2 border border-gray-300 rounded-md text-base dark:bg-slate-800 dark:text-white"
        />
        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-72 p-3 my-2 border border-gray-300 rounded-md text-base dark:bg-slate-800 dark:text-white"
        />
        {/* Submit button that changes text based on auth mode */}
        <button
          onClick={handleAuth}
          className="w-72 p-3 mt-4 bg-blue-500 text-white border-none rounded-md text-base cursor-pointer transition-colors duration-300 hover:bg-blue-700"
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </button>
        {/* Toggle between login and signup modes */}
        <p
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-4 text-sm text-blue-500 cursor-pointer underline hover:text-blue-700"
        >
          {isSignUp ? "Already have an account? Log In" : "Create an account"}
        </p>
      </motion.div>
    </div>
  );
}

export default Auth;