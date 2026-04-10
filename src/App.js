import './App.css';
import ProductList from './components/ProductList';
import StatsBar from './components/StatsBar';
import ProductTable from './components/ProductTable';
import { useState, useEffect} from 'react';
import {getProducts, getCategories } from './services/ProductService';

function App() {
  const [products, setProducts] = useState ([]);
    

  const handleDelete = (id) => {

    setProducts(products.filter(product => product.id !== id))

  }
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
useEffect(() => {
  getProducts()
    .then(response => {
      setProducts(response.data.data);
      setLoading(false);
    })
    .catch(error => {
      setError('Failed to load products. Please try again.');
      setLoading(false);
    });
}, []);

  const [selectedCategorie, setSelectedCategorie] = useState("");

  const [categories , setCategories] = useState([]);
useEffect(() => {
  getCategories()
    .then(response => {
      setCategories(response.data);
    })
    .catch(error => {
      console.log('Error fetching categories:', error);
    });
}, []);




  const filteredProductsAndCategories = products.filter(product =>
    product.name?.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategorie === "" || product.categoryName?.toLowerCase().includes(selectedCategorie.toLowerCase()))
  )

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 style={{color: 'red'}}> {error} </h2>;
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Inventory Management </h1>

      <ProductList products={filteredProductsAndCategories} onDelete={handleDelete} />
      <StatsBar totalProducts={products.length}
        totalStock={products.reduce((total, product) => total + product.stock, 0)}
        lowStock={products.filter(product => product.stock < 15).length} />
      <ProductTable products={filteredProductsAndCategories} />
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={selectedCategorie}
        onChange={(e) => setSelectedCategorie(e.target.value)}
      >

        <option value="">All Categories</option>
        {categories.map(category => (
          <option key ={category.id} value={category.name}> {category.name} </option>
        ))}
      </select>

      <p>Showing {filteredProductsAndCategories.length} of {products.length}</p>

      <button name='Reset Filters' onClick={() => { setSearch(""); setSelectedCategorie(""); }}>
        Reset Filters
      </button>


      <button onClick={() => { setProducts([...products, { id: products.length + 1, name: "Monitor", price: 300, stock: 20, category: "Electronics" }]); }}>
        Agregar un nuevo producto
      </button>



    </div>
  );
}


export default App;
