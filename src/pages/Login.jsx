import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      setUser(user);
      localStorage.removeItem("pendingUser");
      navigate("/");
    } catch (err) {
      setErrors(
        err.response?.data?.errors || ["An error occurred during login."],
      );
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to PingX</h2>
        <p className="auth-subtitle">Welcome back! Please enter your details.</p>
        <div className="auth-form">
          <input
            className="auth-input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="auth-button" onClick={handleLogin}>
            Login
          </button>
        </div>
        {errors.length > 0 && (
          <div className="auth-errors">
            {errors.map((error, index) => (
              <div key={index} className="auth-error-item">
                {error.message || error}
              </div>
            ))}
          </div>
        )}
        <div className="auth-footer">
          <a href="/register" className="auth-link">
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
