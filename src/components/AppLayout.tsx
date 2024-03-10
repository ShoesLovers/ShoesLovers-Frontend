import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MyNavBar from './MyNavbar';
import { userProps } from '../helpers/types';

export default function AppLayout({
  user,
  setUser,
  isLoggedIn,
  setIsLoggedIn,
}: userProps) {
  return (
    <div>
      <MyNavBar
        user={user}
        setUser={setUser}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
