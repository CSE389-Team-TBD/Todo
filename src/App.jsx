// Import necessary routing components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import the authentication component that handles login/signup
import Auth from "./components/Auth";
// Import the main ToDoList component that shows after authentication
import ToDoList from "./components/ToDoList";

function App() {
  return (
    // Router component wraps the entire app to enable routing functionality
    <Router>
      {/* Routes component groups and manages all route definitions */}
      <Routes>
        {/* Root path "/" renders the Auth component for login/signup */}
        <Route path="/" element={<Auth />} />
        {/* "/todos" path renders the ToDoList component after successful auth */}
        <Route path="/todos" element={<ToDoList />} />
      </Routes>
    </Router>
  );
}

// Export the App component as the default export
export default App;