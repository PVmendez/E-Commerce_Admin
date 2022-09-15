import React from "react";
import "../Sidebar/Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="col-1 col-lg-2 sidebar">
        <Link to="/" className="a-sidebar">
          <div className="div-sidebar">
            <i className="fas fa-tachometer-alt me-2"></i>
            <p className="m-0">Dashboard</p>
          </div>
        </Link>

        <div className="div-sidebar">
          <i className="fas fa-user-tag me-2"></i>
          <p className="m-0">Customers</p>
        </div>
        <Link to="/pedidos" className="a-sidebar">
          <div className="div-sidebar">
            <i className="fas fa-shopping-cart me-2"></i>
            <p className="m-0">Orders</p>
          </div>
        </Link>
        <Link to="/productos" className="a-sidebar">
          <div className="div-sidebar">
            <i className="fas fa-gem me-2"></i>
            <p className="m-0">Products</p>
          </div>
        </Link>

        <div className="div-sidebar">
          <i className="fas fa-unlock-alt me-2"></i>
          <p className="m-0">Admin</p>
        </div>
      </div>
    </>
  );
}
