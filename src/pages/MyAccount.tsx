import UpdateUserForm from '../components/UpdateUserForm'
import { User } from '../helpers/types'

export default function MyAccount({
  user,
  setUser,
}: {
  user: User
  setUser: (user: User) => void
}) {
  return (
    <div>
      <UpdateUserForm user={user} setUser={setUser} />
    </div>
  )
}
