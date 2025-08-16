import React from 'react';
// Make sure this path is correct for your project
import './Animate.css';

const FrontPageTwo = () => {
  return (
    <div className="hero-container">
      <div className="hero-title-container">

        {/* --- VERSION 1: FOR DESKTOP --- */}
        {/* This will be visible on screens wider than 767px */}
        <div className="hero-title-desktop">
          <h1 className="hero-title">
            Donate Blood and Save Lives
          </h1>
          <h1 className="hero-title animated-text">
            Donate Blood and Save Lives
          </h1>
        </div>

        {/* --- VERSION 2: FOR MOBILE --- */}
        {/* This will be visible on screens 767px or narrower */}
        <div className="hero-title-mobile-wrapper">
          {/* First line */}
          <div className="hero-title-line">
            <span className="hero-title">Donate Blood</span>
            <span className="hero-title animated-text">Donate Blood</span>
          </div>
          {/* Second line */}
          <div className="hero-title-line">
            <span className="hero-title">and Save Lives</span>
            <span className="hero-title animated-text">and Save Lives</span>
          </div>
        </div>

      </div>
      {/* Buttons can stay here */}
    </div>
  );
};

export default FrontPageTwo;