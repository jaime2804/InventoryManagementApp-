import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import MovementsPage from './pages/MovementsPage';
import Sidebar from './components/Sidebar';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function Layout({ children }) {
  const location = useLocation();
  const isLogin = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="flex">
      {!isLogin && <Sidebar />}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
            <Route path="/categories" element={<PrivateRoute><CategoriesPage /></PrivateRoute>} />
            <Route path="/movements" element={<PrivateRoute><MovementsPage /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;