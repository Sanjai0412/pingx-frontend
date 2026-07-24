import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (loading) return;
    setLoading(true);
    setErrors([]);
    try {
      const data = await registerUser(username, email, password);
      localStorage.setItem("pendingUser", JSON.stringify(data.data));
      navigate("/verify");
    } catch (err) {
      setErrors(
        err.response?.data?.errors || ["An error occurred during registration."],
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create an Account</h2>
        <p className="auth-subtitle">Join PingX today! Fill in the fields below.</p>
        <div className="auth-form">
          <input
            className="auth-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <button className="auth-button" onClick={handleRegister} disabled={loading}>
            {loading ? "Registering..." : "Register"}
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
          <a href="/login" className="auth-link">
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
