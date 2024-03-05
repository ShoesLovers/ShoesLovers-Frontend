import { User } from '../api/auth';
import UpdateUserForm from '../components/UpdateUserForm';

export default function MyAccount({
  user,
  setUser,
}: {
  user: User;
  setUser: (user: User) => void;
}) {
  return (
    <div>
      <UpdateUserForm user={user} setUser={setUser} />
    </div>
  );
}
