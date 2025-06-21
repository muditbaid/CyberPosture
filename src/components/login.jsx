import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialMessage, setSocialMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Special case for testing
      if (username === "admin" && password === "admin") {
        setSuccess(true);
        localStorage.setItem('userType', userType);
        localStorage.setItem('username', username);
        setTimeout(() => navigate('/dashboard'), 1500);
        return;
      }

      const response = await apiService.login({
        username,
        password,
        userType
      });

      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userType', userType);
        localStorage.setItem('username', username);
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock Google login handler
  const handleGoogleLogin = () => {
    setSocialMessage("Google login successful! (mock)");
    // TODO: Integrate with backend when ready
    setTimeout(() => setSocialMessage(""), 2000);
  };

  // Mock Facebook login handler
  const handleFacebookLogin = () => {
    setSocialMessage("Facebook login successful! (mock)");
    // TODO: Integrate with backend when ready
    setTimeout(() => setSocialMessage(""), 2000);
  };

  return (
    <div className="login-page">
      <div className="login-left"></div>
      <div className="login-right">
        <div className="login-container">
          <div className="login-header">
            <h1>CUSTOMER LOGIN</h1>
          </div>
          
          {/* Social Login Buttons */}
          <div className="social-login-section">
            <button className="google-login-btn" onClick={handleGoogleLogin} aria-label="Sign in with Google">
              <span className="google-icon">G</span> Sign in with Google
            </button>
            <button className="facebook-login-btn" onClick={handleFacebookLogin} aria-label="Sign in with Facebook">
              <span className="facebook-icon">f</span> Sign in with Facebook
            </button>
          </div>

          <div className="divider"><span>or</span></div>

          {socialMessage && <div className="social-message">{socialMessage}</div>}

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="remember-forgot">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            {error && <p className="error">{error}</p>}
            
            <button type="submit" className="login-button" disabled={isLoading}>
              LOGIN
            </button>
          </form>

          {success && <p className="success">Successfully logged in! Redirecting to dashboard...</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;