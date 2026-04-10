import { useState } from "react";

function CreateProduct (props) {
    const [formData, setFormData] = useState({
        name: '',
        description : '',
        price : '',
        stock : '',
        categoryId: ''
    });

    
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  return(
  <form onSubmit = {(e) => {
    e.preventDefault();
     props.onSubmit(formData);
      setFormData({ name: '', description: '', price: '', stock: '', categoryId: '' });
  }}>
      <input 
        type="text"
        name="name"
        value={formData.name}      
        onChange={handleChange} 
      />
       <input 
        type="text"
        name="description"
        value={formData.description}     
        onChange={handleChange} 
      />
       <input 
        type="text"
        name="price"
        value={formData.price}      
        onChange={handleChange} 
      />
       <input 
        type="text"
        name="stock"
        value={formData.stock}      
        onChange={handleChange}
      />
       <input 
        type="text"
        name="categoryId"
        value={formData.categoryId}      
        onChange={handleChange} 
      />

      <button type="submit">Create Product</button>
      
    </form>
    

  )
}


export default CreateProduct;

  

