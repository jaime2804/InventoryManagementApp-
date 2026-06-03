import { useState, useEffect } from "react";
import { getMovements, createMovement } from '../services/movementService';
import { getProducts } from "../services/productService";


function MovementsPage() {


    const [movements, setMovements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        type: '',
        quantity: '',
        description: '',
        productId: ''
    });

    const [products, setProducts] = useState([])


    const handleSubmit = (e) => {
        e.preventDefault();
        createMovement(formData)
            .then(response => {
                setMovements([...movements, response.data]);
                setFormData({ type: '', quantity: '', description: '', ProductId: '' });
            })
            .catch(error => {
                console.log('Error creating movement');
            });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        getMovements()
            .then(response => {
                setMovements(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to load movements. Please try again.');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        getProducts()
            .then(response => {
                setProducts(response.data.data);
            })
            .catch(error => {
                console.log('Error fetching products:', error);
            });

    }, []);


    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2 style={{ color: 'red' }}> {error} </h2>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Movement Management </h1>

            <form onSubmit={handleSubmit}>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="">Select type</option>
                    <option value="0">Entry</option>
                    <option value="1">Exit</option>
                </select>

                <input
                    type="text"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <select
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                >
                    <option value="">Select product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>

                <button type="submit">Create Movement</button>

            </form>

        </div>
    );

}


export default MovementsPage;