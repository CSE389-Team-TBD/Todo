// src/components/Auth.js
import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

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
    <div className="auth-container">
      <h1>{isSignUp ? "Sign Up" : "Log In"}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
      />
      <button onClick={handleAuth} className="auth-button">
        {isSignUp ? "Sign Up" : "Log In"}
      </button>
      <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-link">
        {isSignUp ? "Already have an account? Log In" : "Create an account"}
      </p>
    </div>
  );
}

export default Auth;
