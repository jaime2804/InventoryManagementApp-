import { useEffect, useState } from "react";
import { createCategory, getCategories } from '../services/categoryService';

function CategoryPage() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to load categories. Please try again.');
                setLoading(false);
            });
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory(formData)
            .then(response => {
                setCategories([...categories, response.data]);
                setFormData({ name: '', description: '' });
            })
            .catch(error => {
                console.log('Error creating category:', error);
            });
    };



    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2 style={{ color: 'red' }}> {error} </h2>;

    return (
        <div>
            <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>Name</th>
                        <th style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                        </tr>

                    ))}
                </tbody>
            </table >

            <form onSubmit={handleSubmit}>
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

                <button type="submit">Create Category</button>

            </form>
        </div>


    );
}

export default CategoryPage;