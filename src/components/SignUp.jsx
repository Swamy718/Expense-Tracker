import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };
  const handleForm = async (e) => {
    e.preventDefault();
    if (username == "" || password == "" || email == "" || repassword == "") {
      setError("Enter all Details");
      return;
    }
    if (password != repassword) {
      setError("Password mismatched");
      return;
    }
    if (!validateEmail(email)) {
      setError("Enter Valid Email");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await axios.post('https://expense-tracker-backend-e1eq.onrender.com/register',
        {
          username: username,
          email: email,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        setError(response.data.detail || "Something went wrong");
      } else {
        alert("User Created Successfully");
        navigate("/login");
      }

    }
    catch (error) {
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
    <div className='signup-container'>
      <div className="signup-card">
        <form onSubmit={handleForm}>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username"></input>
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"></input>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"></input>

          <label>Confirm Password</label>
          <input type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} placeholder="Re-enter your password"></input>
          {error && <p className='error'>{error}  </p>}
          <button type='submit' disabled={loading}> {loading ? "Signing up..." : "Sign Up"}</button>
        </form>
        < p className='login-link'>Already have an account? <Link to="/login">Login</Link></p>
        <p className='home-link'><Link to="/home">Back to home</Link></p>
      </div>
    </div>
  )
}

export default SignUp;
