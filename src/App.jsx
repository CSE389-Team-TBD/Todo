import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import ToDoList from "./components/ToDoList";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todos" element={<ToDoList />} />
      </Routes>
    </Router>
  );
}

export default App;
