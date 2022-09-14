import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";
import "../Navbar/Navbar.css";

function NavbarAdmin() {
  return (
    <Navbar bg="light" variant="light">
      <Container id="navbarAdmin">
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img src="/img/logo-icon.png" alt="" />
          <p className="p-logo">Admin</p>
        </Navbar.Brand>

        <div>
          <i className="fas fa-search"></i>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarAdmin;
