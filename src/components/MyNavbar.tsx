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
        <NavLink to="/" className="nav-link">
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
          {showMyImage && isLoggedIn && (
            <>
              <div>{user?.name}</div>
              <div className="d-flex align-items-center">
                <ImageShape />
              </div>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
