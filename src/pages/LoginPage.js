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

        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
                {error && <p>{error}</p>}

            </form>
        </div>
    )
}

export default LoginPage