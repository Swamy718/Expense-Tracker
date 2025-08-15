import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import './Login.css';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (username == "" || password == "") {
            setError("Enter all Details");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const formdata = new URLSearchParams();
            formdata.append('username', username);
            formdata.append('password', password);

            const response = await axios.post('https://expense-tracker-backend-w8hm.onrender.com/token',
                formdata,
                { headers: { 'Content-type': 'application/x-www-form-urlencoded' } }
            );

            if (response.status == 200) {
                localStorage.setItem('access_token', response.data.access_token);
                navigate('/profile/dashboard');
            }
            else {
                setError(response.data.detail || "Enter valid details");
            }

        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data && error.response.data.detail) {
                setError(error.response.data.detail);
            } else {
                setError("An error occurred");
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome Back</h2>
                <p className="login-subtitle">Login to manage your expenses</p>

                <form onSubmit={handleLoginSubmit}>
                    <label>Username / Email</label>
                    <input
                        type="text"
                        value={username}
                        placeholder="Enter username or email"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className='error'>{error}  </p>}
                    <button type="submit" className="login-btn" disabled={loading}>{loading ? "Logging In..." : "Login"}</button>
                </form>

                <p className="signup-link">
                    Don’t have an account? <Link to="/signup">Sign up</Link>
                </p>
                <p className='home-link'><Link to="/home">Back to home</Link></p>
            </div>
        </div>
    );
}

export default Login;
