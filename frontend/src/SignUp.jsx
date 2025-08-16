import React, { useState } from 'react';
import './Login.css'; // The same new CSS file
import ToastNotification, { showSuccessToast, showErrorToast } from './ToastNotification';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Your Submit logic remains untouched
  const Submit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username: name, Email: email, Password: password }),
        });

        const data = await res.text();
        if (res.ok) {
        showSuccessToast(data);
        setTimeout(() => {
            navigate('/login');
        }, 5000);
        } else {
        showErrorToast(data || "Registration failed.");
        }
    } catch (error) {
        showErrorToast("An error occurred. Please try again.");
        console.error("Signup error:", error);
    }
  };

  return (
    <div className='auth-page-container'>
      <div className="auth-form-wrapper">
        <div className="form-header">
          <p className="sub-heading">Start for free</p>
          <h1 className="main-heading">Create new account</h1>
        </div>

        <form onSubmit={Submit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn btn-primary" style={{marginTop: '1rem'}}>
            Create account
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </div>
      </div>
      <ToastNotification />
    </div>
  );
}

export default Signup;