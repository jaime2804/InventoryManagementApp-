import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#333', padding: '10px 20px', display: 'flex', gap: '20px' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
      <Link to="/categories" style={{ color: 'white', textDecoration: 'none' }}>Categories</Link>
      <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
    </nav>
  );
}

export default Navbar;