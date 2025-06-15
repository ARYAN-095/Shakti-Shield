import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);

  // Navigation links differ based on auth state
  const links = [
    { name: 'Home',         url: auth ? '/HomePage'           : '/',                     show: true },
    { name: 'Progress',     url: auth ? '/Progress'           : null,                    show: auth },
    { name: 'Reviews',      url: auth ? '/reviews'            : null,                    show: auth },
    { name: 'Contact Us',   url: 'mailto:support@shaktishield.app', show: true },
  ];

  const toggleMenu = () => setOpen(open => !open);
  const handleStart = () => navigate(auth ? '/HomePage' : '/register');
  const handleLogout = async () => {
    const ok = await logout();
    if (ok) navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo / Title */}
        <div className="flex items-center cursor-pointer" onClick={handleStart}>
          <img 
            src="/logo.jpeg" 
            alt="Shakti Shield Logo" 
            className="h-12 w-12 rounded-full mr-2 object-cover" 
          />
          <h1 className="text-2xl font-extrabold text-white tracking-wide">
            Shakti Shield
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link, idx) =>
            link.show ? (
              <a
                key={idx}
                href={link.url}
                className="text-white font-medium hover:underline transition"
              >
                {link.name}
              </a>
            ) : null
          )}

          {auth ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-white text-pink-600 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="ml-4 px-4 py-2 bg-white text-pink-600 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Get Started
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <span className="material-icons">close</span>
          ) : (
            <span className="material-icons">menu</span>
          )}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col space-y-2 p-4">
            {links.map((link, idx) =>
              link.show ? (
                <a
                  key={idx}
                  href={link.url}
                  className="text-gray-700 font-medium hover:text-pink-600 transition"
                >
                  {link.name}
                </a>
              ) : null
            )}

            {auth ? (
              <button
                onClick={handleLogout}
                className="w-full mt-2 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleStart}
                className="w-full mt-2 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
