import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import MyNavBar from "./MyNavbar";
import { User } from "../api/auth";

export default function AppLayout({
  user,
  setUser,
}: {
  user: User;
  setUser: (user: User) => void;
}) {
  return (
    <div>
      <MyNavBar user={user} setUser={setUser} />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
