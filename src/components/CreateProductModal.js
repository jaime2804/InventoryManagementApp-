import { useState } from "react";

function CreateProductModal({ onSave, onClose, categories }) {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        categoryId: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md shadow-xl">
                <h2 className="text-white text-xl font-bold mb-6">Add New Product</h2>
                <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="flex flex-col gap-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                        className="bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Product Name" />
                    <input type="text" name="description" value={formData.description} onChange={handleChange}
                        className="bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Description" />
                    <input type="number" name="price" value={formData.price} onChange={handleChange}
                        className="bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Price" />
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange}
                        className="bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Stock" />
                    <select name="categoryId" value={formData.categoryId} onChange={handleChange}
                        className="bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <div className="flex gap-3 mt-2">
                        <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-medium">Create Product</button>
                        <button type="button" onClick={onClose} className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-500">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProductModal;