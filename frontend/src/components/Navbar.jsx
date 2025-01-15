
import { useContext } from 'react';
import { useAuth } from '../context/AuthContextProvider';



const Navbar = ({ toggleLogin }) => {
  const { authToken, logout } = useAuth();  // Use authToken to check login status

  const handleLogout = () => {
    logout();  // Call the logout function from context
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-gray-800">
              🚗 CarLogo
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <a
              href="/about"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              About
            </a>
            
            {/* Conditional Rendering for Login/Logout */}
            {authToken ? (
              <>
                <button
                  onClick={handleLogout}  // Trigger logout
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border border-blue-600 hover:border-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={toggleLogin}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border border-blue-600 hover:border-blue-700"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
