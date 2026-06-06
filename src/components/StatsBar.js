function ProductsResume(props) {

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700 rounded-lg shadow p-4 hover:bg-gray-600 transition-all duration-200 hover:scale-105 cursor-pointer">
                <p className="text-sm text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-white">{props.totalProducts}</p>
            </div>
            <div className="bg-gray-700 rounded-lg shadow p-4 hover:bg-gray-600 transition-all duration-200 hover:scale-105 cursor-pointer">
                <p className="text-sm text-gray-400">Total Stock</p>
                <p className="text-2xl font-bold text-white">{props.totalStock}</p>
            </div>
            <div className="bg-gray-700 rounded-lg shadow p-4 hover:bg-gray-600 transition-all duration-200 hover:scale-105 cursor-pointer">
                <p className="text-sm text-gray-400">Low Stock Products</p>
                <p className="text-2xl font-bold text-red-400">{props.lowStock}</p>
            </div>
        </div>
    )
}

export default ProductsResume;