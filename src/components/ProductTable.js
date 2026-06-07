

import { useState } from "react";

function ProductTable(props) {

    const [isVisible, setIsVisible] = useState(true);

    return (
        <div className="mb-6">
            <div className="flex gap-3 mb-4">
                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="bg-gray-700 text-gray-300 px-4 py-2 rounded hover:bg-gray-600"
                >
                    {isVisible ? "Hide Table" : "Show Table"}
                </button>
                <button
                    onClick={props.onAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
                >
                    + Add Product
                </button>
            </div>

            {isVisible && (
                <div className="bg-[#1e2533] rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-700 border-b border-gray-600">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Price</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Stock</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Category</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                            {props.products.map(product => (
                                <tr key={product.id} className="hover:bg-gray-600">
                                    <td className="px-6 py-4 text-sm text-gray-200">{product.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-200">{product.price}</td>
                                    <td className="px-6 py-4 text-sm text-gray-200">{product.stock}</td>
                                    <td className="px-6 py-4 text-sm text-gray-200">{product.categoryName}</td>
                                    <td className="px-6 py-4 text-sm">
                                        {product.stock < 15
                                            ? <span className="text-red-500 font-medium">Low stock</span>
                                            : <span className="text-green-500 font-medium">OK</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-sm flex gap-2">
                                        <button onClick={() => props.onDelete(product.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                            Delete
                                        </button>
                                        <button onClick={() => props.onEdit(product)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ProductTable;