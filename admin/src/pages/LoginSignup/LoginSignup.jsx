import { useState } from "react";
import { motion } from "framer-motion";
import "./LoginSignup.css";

export default function LoginSignup() {
  const [isSignUp, setIsSignUp] = useState(false);

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
            {isSignUp && <input type="text" placeholder="Username" className="auth-input" />}
            <input type="email" placeholder="Email" className="auth-input" />
            <input type="password" placeholder="Password" className="auth-input" />
            <button className="auth-button">{isSignUp ? "Sign Up" : "Login"}</button>
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
