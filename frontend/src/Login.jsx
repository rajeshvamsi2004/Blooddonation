import React, { useState } from 'react';
import './Login.css'; 
import ToastNotification, { showSuccessToast, showErrorToast } from './ToastNotification';
import { Link, useNavigate } from 'react-router-dom';
import GoogleIcon from './GoogleIcon'; // <-- IMPORT THE NEW COMPONENT

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  // Your Submit logic remains untouched
  const Sub = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email, Password: pass })
      });

      const result = await res.text();
      if (res.ok && result === "Login Successful") {
        localStorage.setItem("Email", email);
        showSuccessToast(result);
        setTimeout(() => {
          navigate('/box');
        }, 5000);
      } else {
        showErrorToast(result || "Login Failed");
      }
    } catch (error) {
      showErrorToast("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className='auth-page-container'>
      <div className="auth-form-wrapper">
        <div className="form-header">
          <p className="sub-heading">Please enter your details</p>
          <h1 className="main-heading">Welcome back</h1>
        </div>

        <form onSubmit={Sub}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember for 30 days
            </label>
            <a href="#">Forgot password</a>
          </div>

          <button type="submit" className="auth-btn btn-primary">Login</button>
        </form>

        <button className="auth-btn btn-google">
          <GoogleIcon /> {/* <-- USE THE NEW COMPONENT HERE */}
          Sign in with Google
        </button>
        
        <div className="auth-footer">
          <p>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </p>
        </div>
      </div>
      <ToastNotification />
    </div>
  );
}

export default Login;