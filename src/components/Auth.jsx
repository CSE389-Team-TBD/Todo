// src/components/Auth.jsx
import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";


function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/todos");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl mb-4 text-gray-800">{isSignUp ? "Sign Up" : "Log In"}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-72 p-3 my-2 border border-gray-300 rounded-md text-base"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-72 p-3 my-2 border border-gray-300 rounded-md text-base"
      />
      <button onClick={handleAuth} className="w-72 p-3 mt-4 bg-blue-500 text-white border-none rounded-md text-base cursor-pointer transition-colors duration-300 hover:bg-blue-700">
        {isSignUp ? "Sign Up" : "Log In"}
      </button>
      <p onClick={() => setIsSignUp(!isSignUp)} className="mt-4 text-sm text-blue-500 cursor-pointer underline hover:text-blue-700">
        {isSignUp ? "Already have an account? Log In" : "Create an account"}
      </p>
    </div>
  );
}

export default Auth;
