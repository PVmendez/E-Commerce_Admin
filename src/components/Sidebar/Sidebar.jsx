import React from "react";
import "../Sidebar/Sidebar.css";
import { useNavigate, Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="col-2 sidebar d-flex flex-column">
      <Link to="/" className="a">
        Dashboard
      </Link>
      <Link to="/pedidos">Pedidos</Link>
    </div>
  );
}
