import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import blood from './pics/blood.jpeg'
import blood3 from './pics/blood3.jpeg.jpg'
import blood4 from './pics/blood4.jpeg.webp'
import blood5 from './pics/blood5.jpeg';
import './Bootstrap.css';
const Banner = () => {
  return (
    <div id='carousels' >
       <Carousel data-bs-theme="dark"  indicators={false}>
      <Carousel.Item id='kid1div'>
        <img style={{width: "800px", height: "500px", position: "absolute", top: "-410px"}}
          className="d-block w-100"
          src={blood3}
          alt=""
        />
      </Carousel.Item>
      <Carousel.Item id='kid2div'>
        <img style={{width: "800px", height: "500px", position: "absolute", top: "-410px"}}
          className="d-block w-100"
          src={blood4}
          alt=""
        />
      </Carousel.Item>
      <Carousel.Item id='kid3div'>
        <img style={{width: "800px", height: "500px", position: "absolute", top: "-410px", left: "2px"}}
          className="d-block w-100"
          src={blood5}
          alt=""
        />
      </Carousel.Item>
    </Carousel>
    </div>
  );
};
export default Banner;
