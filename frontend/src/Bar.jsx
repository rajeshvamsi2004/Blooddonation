import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';

const Bar = () => {
  return (
    <Navbar expand="lg" className="dashboard-navbar">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto gap-2 gap-lg-4">
            <Nav.Link as={Link} to="/box">Home</Nav.Link>
            <Nav.Link as={Link} to="/eligibility">Eligibility Check</Nav.Link>
            <Nav.Link as={Link} to="/donorlogin">Become a Donor</Nav.Link>
            <Nav.Link as={Link} to="/request">Blood Requests</Nav.Link>
            <Nav.Link as={Link} to="/bloodcamps">Blood Camps</Nav.Link>
            <Nav.Link as={Link} to="/bloodbanks">Blood banks</Nav.Link>
            <Nav.Link as={Link} to="/donation">Blood Search</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Bar;