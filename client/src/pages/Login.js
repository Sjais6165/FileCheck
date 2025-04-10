//

//------------------


// import { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/authcontext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:5000/api/auth/login", {
//                 username,
//                 password
//             });
//             login(res.data.token);  // Save the JWT token
//             navigate("/dashboard"); // Redirect after successful login
//         } catch (error) {
//             alert(error.response?.data?.error || "Login failed. Please check your credentials.");
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;



//-----------------------------

import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                username,
                password
            });
            login(res.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.error || "Login failed. Please check your credentials.");
        }
    };

    return (
        <div style={styles.background}>
            <div style={styles.overlay}></div>
            <div style={styles.card}>
                <h2 style={styles.heading}>Login</h2>
                <form onSubmit={handleLogin} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <label style={styles.toggleLabel}>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            style={styles.checkbox}
                        />
                        Show Password
                    </label>
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    background: {
        height: "100vh",
        width: "100vw",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(-45deg, #ff6b6b, #f06595, #845ef7, #5c7cfa)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        overflow: "hidden",
    },
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backdropFilter: "blur(4px)",
        zIndex: 0,
    },
    card: {
        position: "relative",
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        borderRadius: "20px",
        padding: "40px",
        width: "300px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        color: "#fff",
        textAlign: "center",
    },
    heading: {
        marginBottom: "20px",
        fontSize: "28px",
    },
    form: {
        display: "flex",
        flexDirection: "column"
    },
    input: {
        padding: "10px",
        marginBottom: "12px",
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        fontSize: "16px",
        backgroundColor: "rgba(255,255,255,0.2)",
        color: "#fff",
        outline: "none"
    },
    toggleLabel: {
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        marginBottom: "10px",
        color: "#f1f1f1"
    },
    checkbox: {
        marginRight: "8px"
    },
    button: {
        padding: "10px",
        backgroundColor: "#6a0dad",
        color: "white",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "0.3s ease"
    }
};

// Keyframes for background animation
const styleSheet = document.styleSheets[0];
const keyframes =
    `@keyframes gradient {
    0% {background-position: 0% 50%;}
    50% {background-position: 100% 50%;}
    100% {background-position: 0% 50%;}
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Login;
