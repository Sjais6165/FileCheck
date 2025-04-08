// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) setUser({ token });
//     }, []);

//     const login = (token) => {
//         localStorage.setItem("token", token);
//         setUser({ token });
//     };

//     const logout = () => {
//         localStorage.removeItem("token");
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


//------------------------------------


import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext(null);

// Custom Hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    // Load token from localStorage if exists
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Login function
    const login = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    // Logout function
    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
