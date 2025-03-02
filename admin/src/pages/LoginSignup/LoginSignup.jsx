import { useState } from "react";
import { motion } from "framer-motion";
import "./LoginSignup.css";

export default function LoginSignup() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userData, setUserData] = useState({
    adminUserName: "",
    adminUserPassword: "",
    adminUserEmail: "",
  });

  const [message, setMessage] = useState(""); // For success/error messages
  const [loading, setLoading] = useState(false); // To show loading state

  // Handle user input
  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle SignUp
  const adminUserSignup = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:10019/api/admin-user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration Successful! Please log in.");
        setIsSignUp(false); // Switch to login after signup
      } else {
        setMessage(data.message || "Signup failed!");
      }
    } catch (error) {
      setMessage("Error occurred. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const adminUserLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:10019/api/admin-user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login Successful! Redirecting...");
        setTimeout(() => (window.location.href = "/dashboard"), 1500);
      } else {
        setMessage(data.message || "Login failed!");
      }
    } catch (error) {
      setMessage("Error occurred. Try again!");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-card">
          <h2 className="auth-title">{isSignUp ? "Sign Up" : "Login"}</h2>

          <div className="auth-card-content">
            {isSignUp && (
              <input
                name="adminUserName"
                value={userData.adminUserName}
                onChange={handleChange}
                type="text"
                placeholder="Username"
                className="auth-input"
              />
            )}

            <input
              name="adminUserEmail"
              value={userData.adminUserEmail}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="auth-input"
            />

            <input
              name="adminUserPassword"
              value={userData.adminUserPassword}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="auth-input"
            />

            <button
              onClick={isSignUp ? adminUserSignup : adminUserLogin}
              className="auth-button"
              disabled={loading}
            >
              {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
            </button>

            {message && <p className="auth-message">{message}</p>}

            <p className="auth-switch-text">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <span className="auth-switch-link" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Login" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
