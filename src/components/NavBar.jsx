// src/components/NavBar.js
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="navbar-below">
      <button
        onClick={handleLogout}
        className="logout-button"
      >
        Logout
      </button>
    </div>
  );
}

export default NavBar;
