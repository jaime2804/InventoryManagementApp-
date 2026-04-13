import { useState, useEffect } from 'react';
import StatsBar from '../components/StatsBar';
import ProductTable from '../components/ProductTable';
import CreateProduct from '../components/CreateProductForm';
import EditProductModal from '../components/EditProductModal';
import { getProducts, createProduct, deleteProduct, updateProduct } from '../services/productService';
import { getCategories } from '../services/categoryService';

function ProductsPage() {

  const [products, setProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };


  const handleDelete = (id) => {

    deleteProduct(id)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => {
        console.log('Error deleting product', error);
      });

  };

  const handleSubmit = (FormData) => {

    createProduct(FormData)
      .then(response => {
        setProducts([...products, response.data]);
      })
      .catch(error => {
        console.log('Error creating product');
      });

  };

  const handleSave = (formData) => {
    console.log('handleSave called', formData);
    updateProduct(selectedProduct.id, formData)
      .then(response => {
        console.log('handleSave called', formData);
        setProducts(products.map(p => p.id === selectedProduct.id ? response.data : p));
        setShowModal(false);
        setSelectedProduct(null);
      })
      .catch(error => {
        console.log('Error updating product:', error);
      });
  };

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

  const [categories, setCategories] = useState([]);
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
  if (error) return <h2 style={{ color: 'red' }}> {error} </h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Inventory Management </h1>



      <StatsBar totalProducts={products.length}
        totalStock={products.reduce((total, product) => total + product.stock, 0)}
        lowStock={products.filter(product => product.stock < 15).length} />
      <ProductTable products={filteredProductsAndCategories} onDelete={handleDelete} onEdit={handleEdit} />
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
          <option key={category.id} value={category.name}> {category.name} </option>
        ))}
      </select>
    
      <p>Showing {filteredProductsAndCategories.length} of {products.length}</p>

      <button name='Reset Filters' onClick={() => { setSearch(""); setSelectedCategorie(""); }}>
        Reset Filters
      </button>

      {showModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

<CreateProduct onSubmit={handleSubmit} categories={categories} />
    </div>
  );

}

export default ProductsPage;