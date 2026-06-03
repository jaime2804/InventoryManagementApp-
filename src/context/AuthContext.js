import { createContext, useState, useContext} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    const login = (data) => {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setUser({ name: data.name, role: data.role });
    };


    const logout = () => {
        setToken(null);
        localStorage.removeItem('token')
        setUser(null);
    }

    return (

        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>


    )
}

export const useAuth = () => useContext(AuthContext);