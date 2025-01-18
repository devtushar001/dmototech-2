import React from "react";
import './Sidebar.css';
import nav_icon from "../../assets/db";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink to="/admin" className="sidebar-option">
            <img src={nav_icon.send_icon} alt="" />
            <p>Admin Account</p>
          </NavLink>
          
          <NavLink to='/admin/add' className="sidebar-option">
            <img src={nav_icon.send_icon} alt="" />
            <p>Add Items</p>
          </NavLink>
          
          
            <NavLink to='/admin/list' className="sidebar-option">
              <img src={nav_icon.send_icon} alt="" />
              <p>List Items</p>
            </NavLink>
          
          
            <NavLink to='/admin/orders' className="sidebar-option">
              <img src={nav_icon.send_icon} alt="" />
              <p>Orders Items</p>
            </NavLink>
            <NavLink to='/admin/new-add' className="sidebar-option">
              <img src={nav_icon.send_icon} alt="" />
              <p>Add New Item</p>
            </NavLink>

        </div>
      </div>
    </>
  )
}

export default Sidebar;