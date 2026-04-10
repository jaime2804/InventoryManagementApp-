import CategoryBadge from "./CategoryBadge";



function ProductCard(props) {
    return (

        <div>
            <h2>{props.name}</h2>
            <p>Price: ${props.price}</p>
            <p>Stock: {props.stock} </p>
            <p>Category: {props.categoryName}</p>
            {props.stock < 15 && <p style={{ color: 'red' }}>Low Stock!</p>}
            <CategoryBadge category={props.categoryName} />

            <button onClick={() => props.onDelete(props.id)}>
               Delete
            </button>


        </div>


    );

}

export default ProductCard;