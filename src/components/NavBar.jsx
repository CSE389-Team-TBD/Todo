// src/components/NavBar.jsx
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="mt-8 flex justify-center">
      <button onClick={handleLogout} className="bg-blue-600 text-white border-none px-5 py-2.5 text-base rounded-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-500">
        Logout
      </button>
    </div>
  );
}

export default NavBar;
