import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './StatusBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Slide from './Slide';

import {
  FaUser,
  FaHospital,
  FaUsers,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaBan
} from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';
import Bar from './Bar';
import Bloodrepresent from './Bloodrepresent';


const Dash = () => {
  const navigate = useNavigate();
  const [side, setSide] = useState(false);
  const handleShow = () => setSide(true);
  const handleClose = () => setSide(false);
  const Logout = () => {
    localStorage.removeItem('Email');
    localStorage.removeItem('Blood');
    navigate('/login');
    handleClose(); 
  };

  return (
    <div>
      <Bar />
      <FontAwesomeIcon
        style={{
          cursor: 'pointer',
          display: 'flex',
          top: '12px',
          margin: '5px',
          position: 'absolute'
        }}
        onClick={handleShow}
        icon={faBars}
      />
      <Offcanvas
        id="canvas"
        show={side}
        onHide={handleClose}
        placement="start"
        backdrop={false}
        scroll={true}
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <div id="navbar">
          <Nav className="flex-column">
            <Nav.Link onClick={handleClose}>
              <span className="nav-item-content">
                <FaUser className="icons" size={11} />
                <Link style={{ textDecoration: 'none' }} to="/profile">
                  <span>Profile</span>
                </Link>
              </span>
            </Nav.Link>

            <Nav.Link onClick={handleClose}>
              <span className="nav-item-content">
                <FaUsers className="icons" size={11} />
                <span>Donors</span>
              </span>
            </Nav.Link>

            <Nav.Link onClick={handleClose}>
              <span className="nav-item-content">
                <FaHourglassHalf className="icons" size={11} />
                <Link style={{ textDecoration: 'none' }} to="/pendings">
                  <span>Pendings</span>
                </Link>
              </span>
            </Nav.Link>

            <Nav.Link onClick={handleClose}>
              <span className="nav-item-content">
                <FaCheckCircle className="icons" size={11} />
                <Link style={{textDecoration: 'none'}} to='/accepted'><span>Accepted</span></Link>
              </span>
            </Nav.Link>

            <Nav.Link onClick={handleClose}>
              <span className="nav-item-content">
                <FaTimesCircle className="icons" size={11} />
               <Link to='/rejected' style={{textDecoration: 'none'}}> <span>Rejected</span></Link>
              </span>
            </Nav.Link>

            <Nav.Link onClick={handleClose}>
              <span className="nav-item-content">
                <FaHospital className="icons" size={11}/>
                <span>BloodBanks</span>
              </span>
            </Nav.Link>

            <Nav.Link onClick={Logout}>
              <span className="nav-item-content">
                <FaBan className="icons" size={11} />
                <span>Logout</span>
              </span>
            </Nav.Link>
          </Nav>
        </div>
      </Offcanvas>
      <Slide/>
      <h1 style={{fontFamily: 'serif', marginLeft: '-240px', marginTop: '10px'}}>Donation Group Comaptibility Table</h1> <br />
      <Bloodrepresent/>
    </div>
  );
};
export default Dash;
