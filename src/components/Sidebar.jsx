import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { id: 1, name: "All Users", route: "/all-users" },
    { id: 2, name: "Product", route: "/all-product" },
  ];

  return (
    <div className="layout">
      <div className="sidebar-container">
        <ul className="sidebar-links">
          {links.map((link) => (
            <li key={link.id} className="sidebar-item">
              <Link to={link.route} className="sidebar-link">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-container">
        <Outlet /> {/* This will show all the data in the dashboard */}
      </div>
    </div>
  );
};

export default Sidebar;
