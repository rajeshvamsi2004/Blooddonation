import React from 'react';
import './Animate.css'; // Import the new CSS file
import { Link } from 'react-router-dom';

const FrontPage = () => {
  return (
    <div className="hero-container">
      <div className="hero-title-container">
        {/* This one provides the base color and structure */}
        <h1 className="hero-title">Donate Blood and Save Lives</h1>
        {/* This one creates the animated red overlay */}
        <h1 className="hero-title animated-text">Donate Blood and Save Lives</h1>
      </div>
      
      <div className="hero-buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Signup</Link>
      </div>
    </div>
  );
};

export default FrontPage;