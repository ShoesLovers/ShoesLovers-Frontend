import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MyNavBar from './MyNavbar';

export default function AppLayout() {
  return (
    <div>
      <MyNavBar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
