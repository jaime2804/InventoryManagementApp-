import { useState } from "react";

function CreateProduct(props) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: ''
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit(formData);
      setFormData({ name: '', description: '', price: '', stock: '', categoryId: '' });
    }}>
      <input
        type="text"
        name="name"
        placeholder="Product Name to add"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Product Description to add"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price of product to add"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="stock"
        placeholder="Stock of product to be added"
        value={formData.stock}
        onChange={handleChange}
      />
      <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
        <option value="">Select a category</option>
        {props.categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>

      <button type="submit">Create Product</button>

    </form>


  )
}


export default CreateProduct;



