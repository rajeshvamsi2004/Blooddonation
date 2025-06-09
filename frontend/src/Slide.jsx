import Carousel from 'react-bootstrap/Carousel';
import blood1 from './pics/Blood1.jpeg';
import blood2 from './pics/Bloodimage.jpeg';
import './StatusBox.css'

const Slide = () => {
  return (
    <Carousel id='carouseldiv' indicators={false}>
      <Carousel.Item id='carimg'>
        <img className="d-block w-100" src={blood1} alt="First slide"/>
      </Carousel.Item>
      <Carousel.Item id='carimg'>
        <img className="d-block w-100" src={blood2} alt="Second slide"/>
      </Carousel.Item>
      <Carousel.Item  id='carimg'>
        <img className="d-block w-100" src="https://img.freepik.com/free-vector/happy-world-blood-donor-day-red-grey-yellow-background-social-media-design-banner-free-vector_1340-21612.jpg" alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default Slide;
