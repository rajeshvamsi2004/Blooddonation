import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import blood3 from './pics/blood3.jpeg.jpg';
import blood4 from './pics/blood4.jpeg.webp';
import blood5 from './pics/blood5.jpeg';
import Blood1 from './pics/Blood1.jpeg';
import './dashboard.css';

const Banner = () => {
  return (
    // The className here is key for the new CSS styling
    <div className="dashboard-banner">
       <Carousel  indicators={true} interval={1000} controls={true} >
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={blood3}
            alt="Blood donation concept with a heart shape"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={blood4}
            alt="A nurse preparing a blood donation kit"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={Blood1}
            alt="Close-up of a blood bag being filled"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Banner;