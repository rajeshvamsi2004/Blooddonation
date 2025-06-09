import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Bar = () => {
  return (
    <>
      <Navbar style={{backgroundColor: 'red'}} data-bs-theme="dark">
        <Container id='barcontainer'>
          <Nav  id='barcontainer2' className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Link style={{textDecoration: 'none'}} to='/donorlogin'><Nav.Link href="#donor-login">Donor Login</Nav.Link></Link>
            <Link style={{textDecoration: 'none'}} to='/request'><Nav.Link href="#blood-requests">Blood Requests</Nav.Link></Link>
            <Nav.Link href="#register">Blood Camps</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Bar;
