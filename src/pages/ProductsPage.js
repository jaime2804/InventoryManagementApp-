import { useState, useEffect } from 'react';
import StatsBar from '../components/StatsBar';
import ProductTable from '../components/ProductTable';
import CreateProductModal from '../components/CreateProductModal';
import EditProductModal from '../components/EditProductModal';
import { getProducts, createProduct, deleteProduct, updateProduct } from '../services/productService';
import { getCategories } from '../services/categoryService';
import { motion } from 'framer-motion';


function ProductsPage() {

  const [products, setProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);

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
    <motion.div
      className="p-6 bg-gray-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
      </div>


      <StatsBar totalProducts={products.length}
        totalStock={products.reduce((total, product) => total + product.stock, 0)}
        lowStock={products.filter(product => product.stock < 15).length} />
      <ProductTable products={filteredProductsAndCategories} onDelete={handleDelete} onEdit={handleEdit} onAdd={() => setShowCreateModal(true)} />
      <div className="flex items-center justify-start gap-3 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 text-gray-300 text-sm rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-700"
        />
        <select
          value={selectedCategorie}
          onChange={(e) => setSelectedCategorie(e.target.value)}
          className="bg-gray-800 text-gray-300 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-700"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
        <button
          onClick={() => { setSearch(""); setSelectedCategorie(""); }}
          className="text-gray-400 text-sm hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700 border border-gray-700"
        >
          Reset
        </button>
        <span className="text-gray-500 text-sm">
          {filteredProductsAndCategories.length} of {products.length}
        </span>
      </div>

      {showModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {showCreateModal && (
        <CreateProductModal
          onSave={(formData) => {
            handleSubmit(formData);
            setShowCreateModal(false);
          }}
          onClose={() => setShowCreateModal(false)}
          categories={categories}
        />
      )}


    </motion.div>
  );

}

export default ProductsPage;