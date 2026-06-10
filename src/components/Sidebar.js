import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="w-64 bg-gray-900 min-h-screen flex flex-col p-6">
            <h2 className="text-white text-xl font-bold mb-10"> Inventory</h2>
            <nav className="flex flex-col gap-3">
                <Link to="/products" className="text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded">
                    Products
                </Link>
                <Link to="/categories" className="text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded">
                    Categories
                </Link>
                <Link to="/movements" className="text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded">
                    Movements
                </Link>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
                >
                    Logout
                </button>
            </nav>
        </div>
    );
}

export default Sidebar;