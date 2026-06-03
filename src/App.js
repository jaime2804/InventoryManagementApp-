import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import MovementsPage from './pages/MovementsPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/products" element={ <PrivateRoute><ProductsPage/> </PrivateRoute> } />
          <Route path="/categories" element={ < PrivateRoute> <CategoriesPage /> </PrivateRoute>} />
          <Route path="/movements" element={ <PrivateRoute> <MovementsPage/> </PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );


}


export default App;
