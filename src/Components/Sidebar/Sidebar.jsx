import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Optional: add custom styles

const Sidebar = () => {
  return (
    <div className="bg-dark text-white" id="sidebar-wrapper">
      <div className="sidebar-heading p-3">Admin Dashboard</div>
      <div className="list-group list-group-flush">
        <Link
          to="/dashboard"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          Dashboard
        </Link>
        <Link
          to="/users"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          User Management
        </Link>
        <Link
          to="/setoran"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          Setoran
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
