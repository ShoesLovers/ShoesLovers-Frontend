import { useMutation } from '@tanstack/react-query';
import { LogoutAPI } from '../api/auth_api';
import { removeFromLocal } from '../helpers/saveToLocal';
import toast from 'react-hot-toast';
import { User } from '../helpers/types';

export function useLogout(
  setIsLoggedIn: (isLoggedIn: boolean) => void,
  setUser: (user: User) => void
) {
  const { mutate: logout, isPending } = useMutation({
    mutationFn: LogoutAPI,
    onSuccess: () => {
      setIsLoggedIn(false);
      setUser({} as User);

      removeFromLocal('user', 'accessToken', 'refreshToken');
      toast.success('You have successfully logged out 😄');
    },
  });

  return { logout, isPending };
}
