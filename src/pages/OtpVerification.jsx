import { useState, useEffect } from "react";
import { resendOTP, verifyOtp } from "../services/authService";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState([]);
  const [pendingUser, setPendingUser] = useState(null);
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
    if (!pendingUser) return;
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
    }
  };

  const handleOtpResend = async () => {
    if (!pendingUser) return;
    try {
      await resendOTP(pendingUser.id);
      console.log("OTP sent successfully");
    } catch (err) {
      setErrors(
        err.response?.data?.errors || ["An error occurred during OTP resend"],
      );
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
          <button className="auth-button" onClick={handleOtpVerification}>
            Verify
          </button>
          <button className="auth-button-secondary" onClick={handleOtpResend}>
            Resend OTP
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
