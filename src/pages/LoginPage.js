import { useState } from "react"
import { login as loginService } from '../services/loginService'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
function LoginPage() {


    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        loginService(email, password)
            .then(response => {
                console.log(response.data)
                login(response.data);
                navigate('/products');
            })
            .catch(error => {
                setError('Failed to login . Please try again.');
            });
    };
    

    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Login
                </button>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
    </div>
)
    
}

export default LoginPage