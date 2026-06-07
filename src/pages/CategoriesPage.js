import { useEffect, useState } from "react";
import { createCategory, getCategories } from '../services/categoryService';

function CategoryPage() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to load categories. Please try again.');
                setLoading(false);
            });
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory(formData)
            .then(response => {
                setCategories([...categories, response.data]);
                setFormData({ name: '', description: '' });
            })
            .catch(error => {
                console.log('Error creating category:', error);
            });
    };



    if (loading) return <h2 className="text-white p-6">Loading...</h2>;
    if (error) return <h2 className="text-red-500 p-6">{error}</h2>;

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Categories</h1>
            </div>

            <div className="bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
                <table className="w-full">
                    <thead className="bg-gray-700 border-b border-gray-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {categories.map(category => (
                            <tr key={category.id} className="hover:bg-gray-700">
                                <td className="px-6 py-4 text-sm text-gray-200">{category.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-200">{category.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-white text-lg font-semibold mb-4">Add New Category</h2>
                <form onSubmit={handleSubmit} className="flex gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Category name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-700 text-white rounded px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Category description"
                        value={formData.description}
                        onChange={handleChange}
                        className="bg-gray-700 text-white rounded px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium">
                        Create Category
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CategoryPage;