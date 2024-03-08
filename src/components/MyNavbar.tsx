import { useMutation } from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LogoutAPI } from '../api/auth'
import { User, userProps } from '../helpers/types'
import toast from 'react-hot-toast'
import ImageShape from './ImageShape'
import { useState } from 'react'
import { removeFromLocal } from '../helpers/saveToLocal'

import { CiLogin } from 'react-icons/ci'
import { CiLogout } from 'react-icons/ci'
import { MdOutlineAppRegistration } from 'react-icons/md'
import { IoHomeOutline } from 'react-icons/io5'
import { MdManageAccounts } from 'react-icons/md'
import { LiaCommentSolid } from 'react-icons/lia'
export default function MyNavBar({
  user,
  setUser,
  isLoggedIn,
  setIsLoggedIn,
}: userProps) {
  const [showMyImage, setShowMyImage] = useState(true)

  const { mutate: logout } = useMutation({
    mutationFn: LogoutAPI,
    onSuccess: () => {
      setIsLoggedIn(false)
      setUser({} as User)

      removeFromLocal('user', 'accessToken', 'refreshToken')

      toast.success('You have successfully logged out 😄')
    },
  })

  const toggleShowMyImage = () => {
    setShowMyImage(!showMyImage)
  }

  return (
    <Navbar
      expand="md"
      className="bg-body-tertiary sticky-top"
      onToggle={toggleShowMyImage}
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
  )
}
