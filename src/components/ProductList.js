import ProductCard from './ProductCard';

function ProductList(props) {

    return (
     <div> 
    {props.products.map(product => (
        <ProductCard key={product.id} id= {product.id} name={product.name} price={product.price} stock={product.stock} categoryName={product.categoryName} onDelete = {props.onDelete} />
  
    ))}
 </div>
);}

export default ProductList;