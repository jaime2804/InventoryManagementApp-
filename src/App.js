import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';


function App() {
 

  return (
  <BrowserRouter>
  <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);


}


export default App;
