
const { useState } = require("react");

function EditProductModal(props) {

    const [formData, setFormData] = useState({
        name: props.product.name,
        description: props.product.description,
        price: props.product.price,
        stock: props.product.stock,
        categoryId: props.product.categoryId

    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

 return (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '400px'}}>
                <h2>Edit Product</h2>
                <form onSubmit={(e) => { e.preventDefault(); props.onSave(formData); }}>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} /><br/>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} /><br/>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} /><br/>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} /><br/>
                    <input type="number" name="categoryId" value={formData.categoryId} onChange={handleChange} /><br/>
                    <button type="submit">Save</button>
                    <button type="button" onClick={props.onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditProductModal;