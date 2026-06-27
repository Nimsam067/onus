import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

// Mock credentials — swap these out when the real auth API is ready
const MOCK_EMAIL = "demo@onus.app";
const MOCK_PASSWORD = "password";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
        onLogin();
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">O</div>
          <span className="login-logo-text">onus</span>
        </div>

        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Sign in to your workspace</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button
            type="submit"
            className="login-btn"
            disabled={loading || !email || !password}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="login-hint">
          Demo: <code>demo@onus.app</code> / <code>password</code>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
