import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MyNavBar from './MyNavbar';

export type loggedInProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

export default function AppLayout({
  isLoggedIn,
  setIsLoggedIn,
}: loggedInProps) {
  return (
    <div>
      <MyNavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
