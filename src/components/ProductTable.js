

import { useState } from "react";

function ProductTable(props) {

    const [isVisible, setIsVisible] = useState(true);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? "Hide Table" : "Show Table"}
            </button>
            {isVisible &&
                <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>Name</th>
                            <th style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>Price</th>
                            <th style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>Stock</th>
                            <th style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>Category</th>
                            <th style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>Status</th>
                            <th style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.products.map(product => (
                            <tr key={product.id}>
                                <td style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>{product.name}</td>
                                <td style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>{product.price}</td>
                                <td style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>{product.stock}</td>
                                <td style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>{product.categoryName}</td>
                                <td style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>{product.stock < 15
                                    ? <span style={{ color: 'red' }}>Low stock</span>
                                    : <span style={{ color: 'green' }}>OK</span>
                                }</td>
                                <td style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>{<button onClick={() => props.onDelete(product.id)}>
                                    Delete
                                </button>}</td>
                                 <td style={{ padding: '8px 8px', borderBottom: '1px solid #ccc' }}>{<button onClick={() => props.onEdit(product)}>
                                    Edit
                                </button>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>

    )
}

export default ProductTable;