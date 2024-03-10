import UpdateUserForm from '../components/UpdateUserForm';
import { User } from '../helpers/types';

export default function MyAccount({
  user,
  setUser,
  isLoggedIn,
}: {
  user: User;
  setUser: (user: User) => void;
  isLoggedIn: boolean;
}) {
  return (
    <div>
      {isLoggedIn ? (
        <UpdateUserForm user={user} setUser={setUser} />
      ) : (
        <h1>Login to see your account</h1>
      )}
    </div>
  );
}
