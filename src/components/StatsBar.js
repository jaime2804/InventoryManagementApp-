function ProductsResume (props){

    return (

        <div>
            <h2>StatsBar</h2>
            <p>Total Products: {props.totalProducts}</p>
            <p>Total Stock: {props.totalStock}</p>
            <p>Low Stock Products: {props.lowStock}</p>
        </div>
    )
}

export default ProductsResume;