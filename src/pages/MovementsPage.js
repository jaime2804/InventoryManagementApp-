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


    if (loading) return <h2 className="text-white p-6">Loading...</h2>;
    if (error) return <h2 className="text-red-500 p-6">{error}</h2>;

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-6">Movements</h1>

            <div className="bg-gray-800 rounded-lg shadow p-6 mb-6">
                <h2 className="text-white text-lg font-semibold mb-4">Add New Movement</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <select name="type" value={formData.type} onChange={handleChange}
                        className="bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select type</option>
                        <option value="0">Entry</option>
                        <option value="1">Exit</option>
                    </select>
                    <input type="text" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange}
                        className="bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange}
                        className="bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <select name="productId" value={formData.productId} onChange={handleChange}
                        className="bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select product</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </select>
                    <button type="submit"
                        className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-medium">
                        Create Movement
                    </button>
                </form>
            </div>

            <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-700 border-b border-gray-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Type</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Product</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Quantity</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Description</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">User</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {movements.map(movement => (
                            <tr key={movement.id} className="hover:bg-gray-700">
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${movement.type === 'Entry' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                        {movement.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-200">{movement.productName}</td>
                                <td className="px-6 py-4 text-sm text-gray-200">{movement.quantity}</td>
                                <td className="px-6 py-4 text-sm text-gray-200">{movement.description}</td>
                                <td className="px-6 py-4 text-sm text-gray-200">{movement.userName}</td>
                                <td className="px-6 py-4 text-sm text-gray-200">{new Date(movement.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default MovementsPage;