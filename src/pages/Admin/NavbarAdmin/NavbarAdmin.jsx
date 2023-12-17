import "./Navbar.css";
import Logo from "../../../assets/logo.png";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

import { BsSearch } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

function NavbarAdmin() {
  const handleLogoutAdmin = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <Navbar
        key="lg"
        bg="light"
        expand="lg"
        className="mb-3 d-flex flex-column justify-content-between shadow sticky-top bg-white"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/admin">
            {" "}
            <img src={Logo} id="logo" alt="Environthink Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                <img src={Logo} id="logo" alt="Environthink Logo" />
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <ul className="navbar-nav">
                  <li className="nav-item mt-1">
                    <NavLink className="nav-link active" to="/admin/aksi">
                      Aksi
                    </NavLink>
                  </li>
                  <li className="nav-item mt-1">
                    <NavLink className="nav-link active" to="/admin/article">
                      Artikel
                    </NavLink>
                  </li>

                  <li className="nav-item mt-1">
                    <NavLink className="nav-link active" to="/admin/infografis">
                      Infografis
                    </NavLink>
                  </li>
                  <li className="nav-item mt-1">
                    <NavLink className="nav-link active" to="/admin/donasi">
                      Donasi
                    </NavLink>
                  </li>

                  <li className="nav-item ">
                    <div id="button-login">
                      <NavLink
                        className="btnLogin m-1 btn nav-link active ps-3 pe-3"
                        onClick={handleLogoutAdmin}
                      >
                        Logout
                      </NavLink>
                    </div>
                  </li>
                </ul>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarAdmin;
