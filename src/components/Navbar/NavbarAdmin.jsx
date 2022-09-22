import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";

function NavbarAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Navbar bg="light" variant="light" id="navbarAdmin">
      <div>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            className="me-1"
            src="https://taklnamocbdbysfkbsho.supabase.co/storage/v1/object/public/psfe-commerce/logo-icon.png"
            alt="logo"
          />
          <p className="p-logo">Admin</p>
        </Navbar.Brand>
      </div>

      <div className="d-flex align-items-center ">
        <i className="fas fa-search" style={{ color: "grey" }}></i>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/login");
            dispatch(logoutAdmin());
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </Navbar>
  );
}

export default NavbarAdmin;
