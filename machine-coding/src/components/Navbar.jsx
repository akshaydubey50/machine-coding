// components/Navbar.jsx
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/useThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              Logo
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-300">
                Home
              </Link>
              <Link to="/about" className="hover:text-gray-600 dark:hover:text-gray-300">
                About
              </Link>
              <Link to="/contact" className="hover:text-gray-600 dark:hover:text-gray-300">
                Contact
              </Link>
            </div>
          </div> */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;