import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  RiDashboardFill, 
  RiUserFill, 
  RiGroupFill, 
  RiCheckboxCircleFill, 
  RiTimeFill, 
  RiCloseCircleFill 
} from 'react-icons/ri';
import { FaHandHoldingHeart } from 'react-icons/fa';

// This component holds the sidebar's content to keep the code DRY
const SidebarContent = ({ onLinkClick }) => (
  <>
    <div className="sidebar-header">
      <FaHandHoldingHeart className="sidebar-logo-icon" />
      <h1 className="sidebar-title">LifeFlow</h1>
    </div>
    <nav className="sidebar-nav">
      <NavLink to="/dashboard" onClick={onLinkClick}>
        <RiDashboardFill className="nav-icon" /> Dashboard
      </NavLink>
      <NavLink to="/profile" onClick={onLinkClick}>
        <RiUserFill className="nav-icon" /> Profile
      </NavLink>
      <NavLink to="/donors" onClick={onLinkClick}>
        <RiGroupFill className="nav-icon" /> Donors
      </NavLink>
      <NavLink to="/accepted" onClick={onLinkClick}>
        <RiCheckboxCircleFill className="nav-icon" /> Accepted
      </NavLink>
      <NavLink to="/pending" onClick={onLinkClick}>
        <RiTimeFill className="nav-icon" /> Pending
      </NavLink>
      <NavLink to="/rejected" onClick={onLinkClick}>
        <RiCloseCircleFill className="nav-icon" /> Rejected
      </NavLink>
    </nav>
  </>
);

export default SidebarContent;