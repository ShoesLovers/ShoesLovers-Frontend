import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function MyNavBar() {
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">ShoesLover 👟</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>

            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>

            <NavLink to="/myaccount" className="nav-link">
              My Account
            </NavLink>

            <NavLink to="/logout" className="nav-link">
              Logout
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
