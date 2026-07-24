import { useState, useEffect } from "react";
import { resendOTP, verifyOtp } from "../services/authService";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState([]);
  const [pendingUser, setPendingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("pendingUser");
    if (!storedUser) {
      navigate("/register");
      return;
    }
    setPendingUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleOtpVerification = async () => {
    if (!pendingUser || loading) return;
    setLoading(true);
    setErrors([]);
    try {
      await verifyOtp(pendingUser.id, otp);
      localStorage.removeItem("pendingUser");
      localStorage.setItem("needsProfileSetup", "true"); // Set flag
      navigate("/login");
    } catch (err) {
      setErrors(
        err.response?.data?.errors || [
          "An error occurred during OTP verification",
        ],
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpResend = async () => {
    if (!pendingUser || resending) return;
    setResending(true);
    setErrors([]);
    try {
      await resendOTP(pendingUser.id);
      console.log("OTP sent successfully");
    } catch (err) {
      setErrors(
        err.response?.data?.errors || ["An error occurred during OTP resend"],
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Verify OTP</h2>
        {pendingUser && (
          <p className="auth-subtitle">
            We sent a verification code to: <strong>{pendingUser.email}</strong>
          </p>
        )}
        <div className="auth-form">
          <input
            className="auth-input"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="auth-button"
            onClick={handleOtpVerification}
            disabled={loading || resending}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
          <button
            className="auth-button-secondary"
            onClick={handleOtpResend}
            disabled={loading || resending}
          >
            {resending ? "Resending..." : "Resend OTP"}
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
      </div>
    </div>
  );
};

export default OtpVerification;
