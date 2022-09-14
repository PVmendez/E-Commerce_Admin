import Navbar from "react-bootstrap/Navbar";
import "../Navbar/Navbar.css";

function NavbarAdmin() {
  return (
    <Navbar bg="light" variant="light" id="navbarAdmin">
      <div>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img className="me-1" src="/img/logo-icon.png" alt="logo" />
          <p className="p-logo">Admin</p>
        </Navbar.Brand>
      </div>

      <div className="d-flex align-items-center ">
        <i className="fas fa-search" style={{ color: "grey" }}></i>
        <img
          src="./img/avatar-7.png"
          alt="avatarAdmin"
          className="avatarAdmin ms-4"
        />
      </div>
    </Navbar>
  );
}

export default NavbarAdmin;
