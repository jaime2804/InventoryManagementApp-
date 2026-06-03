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
    <nav style={{ backgroundColor: '#333', padding: '10px 20px', display: 'flex', gap: '20px' }}>
      <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
      <Link to="/categories" style={{ color: 'white', textDecoration: 'none' }}>Categories</Link>
      <Link to="/movements" style={{ color: 'white', textDecoration: 'none' }}>Movement</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;