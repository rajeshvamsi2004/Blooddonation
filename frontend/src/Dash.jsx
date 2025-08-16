import React,{useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

// Import your components
import Banner from './Banner';
import Bar from './Bar';

// Import your icons
import { FaUser, FaHospital, FaUsers, FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaBan } from 'react-icons/fa';

// Import your stylesheet
import './dashboard.css';

// Reusable component for the navigation links
const SidebarNav = ({ onLinkClick, onLogout }) => {
  // A reusabldashe Nav.Link component to reduce repetition
  const NavLink = ({ to, icon, children }) => (
    <Nav.Link as={Link} to={to} onClick={onLinkClick} className="sidebar-link">
      {icon}
      <span>{children}</span>
    </Nav.Link>
  );

  return (
    <Nav className="flex-column sidebar-nav">
      <NavLink to="/profile" icon={<FaUser />}>Profile</NavLink>
      <NavLink to="/donors" icon={<FaUsers />}>Donors</NavLink>
      <NavLink to="/pendings" icon={<FaHourglassHalf />}>Pendings</NavLink>
      <NavLink to="/accepted" icon={<FaCheckCircle />}>Accepted</NavLink>
      <NavLink to="/rejected" icon={<FaTimesCircle />}>Rejected</NavLink>
      <NavLink to="/bloodbanks" icon={<FaHospital />}>Blood Banks</NavLink>
      {/* Logout is an action, so it's a button/link that triggers a function */}
      <Nav.Link onClick={onLogout} className="sidebar-link">
        <FaBan />
        <span>Logout</span>
      </Nav.Link>
    </Nav>
  );
};


const Dash = () => {
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    // Ensure the offcanvas closes if logout is clicked from there
    if (showOffcanvas) {
      handleClose();
    }
  };

  return (
    <div className='dashboard-layout'>
      {/* --- Desktop Sidebar (Visible on large screens) --- */}
      <nav className="desktop-sidebar d-none d-lg-block">
        <h3 className="sidebar-title">Menu</h3>
        <SidebarNav onLogout={handleLogout} />
      </nav>

      {/* --- Mobile Offcanvas Sidebar --- */}
      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="start" className="mobile-sidebar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarNav onLinkClick={handleClose} onLogout={handleLogout} />
        </Offcanvas.Body>
      </Offcanvas>

      {/* --- Main Content Area (includes top bar and banner) --- */}
      <main className='dashboard-content'>
        {/* Hamburger Menu Button - Placed in the content area for better alignment */}
        <FontAwesomeIcon
            className="menu-toggle-btn d-lg-none"
            onClick={handleShow}
            icon={faBars}
        />
        <Bar />
        <Banner />
        {/* Your other dashboard content would go here */}
      </main>
    </div>
  );
};

export default Dash;