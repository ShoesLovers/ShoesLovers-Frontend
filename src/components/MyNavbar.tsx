import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { userProps } from '../helpers/types';
import ImageShape from './ImageShape';
import { useState } from 'react';

import { CiLogin } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import { MdOutlineAppRegistration } from 'react-icons/md';
import { IoHomeOutline } from 'react-icons/io5';
import { MdManageAccounts } from 'react-icons/md';
import { LiaCommentSolid } from 'react-icons/lia';
import { useLogout } from '../hooks/useLogout';
import MySpinner from './MySpinner';
export default function MyNavBar({
  user,
  setUser,
  isLoggedIn,
  setIsLoggedIn,
}: userProps) {
  const [showMyImage, setShowMyImage] = useState(true);
  const { logout, isPending } = useLogout(setIsLoggedIn, setUser);

  const toggleShowMyImage = () => {
    setShowMyImage(!showMyImage);
  };

  if (isPending) return <MySpinner />;
  return (
    <Navbar
      expand="md"
      className="bg-body-tertiary sticky-top"
      onToggle={toggleShowMyImage}
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '1.2em',
      }}
    >
      <Container>
        <NavLink
          to="/"
          className="nav-link"
          style={{
            marginRight: '2.5rem',
          }}
        >
          <IoHomeOutline size="1.7em" />
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mr-3">
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className="nav-link"
                  style={{
                    marginRight: '0.2rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    Login
                  </span>
                  {'  '}
                  <CiLogin size="1.5em" />
                </NavLink>

                <NavLink
                  to="/register"
                  className="nav-link"
                  style={{
                    marginRight: '0.2rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    Register
                  </span>
                  {'  '}
                  <MdOutlineAppRegistration size="1.5em" />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/myaccount"
                  className="nav-link"
                  style={{
                    marginRight: '0.2rem',
                  }}
                >
                  <MdManageAccounts size="1.6em" />
                </NavLink>
                <NavLink
                  to="/posts"
                  className="nav-link"
                  style={{
                    marginRight: '0.2rem',
                  }}
                >
                  <LiaCommentSolid size="1.6em" />
                </NavLink>
                <NavLink
                  to="/"
                  className="nav-link"
                  style={{
                    marginRight: '0.2rem',
                  }}
                  onClick={() => logout()}
                >
                  <CiLogout size="1.6em" />
                </NavLink>
              </>
            )}
          </Nav>
          {showMyImage && isLoggedIn && (
            <>
              <span
                style={{
                  color: '#35374B',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                {user?.name}
              </span>
              <div className="d-flex align-items-center">
                <ImageShape user={user} />
              </div>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
