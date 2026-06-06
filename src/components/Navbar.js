import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }


return (
    <nav className="bg-gray-800 px-6 py-3 flex gap-6 items-center">
      <Link to="/products" className="text-white hover:text-blue-400">
        Products
      </Link>
      <Link to="/categories" className="text-white hover:text-blue-400">
        Categories
      </Link>
      <Link to="/movements" className="text-white hover:text-blue-400">
        Movement
      </Link>
      <button
        onClick={handleLogout}
        className="ml-auto bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;