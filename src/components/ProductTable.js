

import { useState } from "react";

function ProductTable(props) {

    const [isVisible, setIsVisible] = useState(true);

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="mb-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
                {isVisible ? "Hide Table" : "Show Table"}
            </button>
            {isVisible &&
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Stock</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {props.products.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-800">{product.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{product.price}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{product.stock}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{product.categoryName}</td>
                                    <td className="px-6 py-4 text-sm">
                                        {product.stock < 15
                                            ? <span className="text-red-500 font-medium">Low stock</span>
                                            : <span className="text-green-500 font-medium">OK</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-sm flex gap-2">
                                        <button
                                            onClick={() => props.onDelete(product.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => props.onEdit(product)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default ProductTable;