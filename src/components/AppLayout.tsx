import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MyNavBar from './MyNavbar';
import { User } from '../App';

export type loggedInProps = {
  user: User;
  setUser: (value: User) => void;
};

export default function AppLayout({ user, setUser }: loggedInProps) {
  return (
    <div>
      <MyNavBar user={user} setUser={setUser} />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
