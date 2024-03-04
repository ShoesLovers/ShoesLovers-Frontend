import { useMutation } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LogoutAPI } from '../api/auth';
import toast from 'react-hot-toast';
import { User } from '../App';

export default function MyNavBar({
  user,
  setUser,
}: {
  user: User;
  setUser: (user: User) => void;
}) {
  const isLoggedIn = user.isLoggedIn;
  const { mutate: logout } = useMutation({
    mutationFn: LogoutAPI,
    onSuccess: () => {
      setUser({ ...user, isLoggedIn: false });
      localStorage.removeItem('user');
      toast.success('You have successfully logged out 😄');
    },
  });
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <NavLink to="/login" className="nav-link">
          ShoesLover 👟
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>

                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/myaccount" className="nav-link">
                  My Account
                </NavLink>
                <NavLink to="/posts" className="nav-link">
                  Posts
                </NavLink>
                <NavLink
                  to="/login"
                  className="nav-link"
                  onClick={() => logout()}
                >
                  Logout
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
