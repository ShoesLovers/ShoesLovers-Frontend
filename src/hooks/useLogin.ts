import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LoginAPI } from '../api/auth_api';
import { getUserAPI } from '../api/account_api';
import toast from 'react-hot-toast';
import { LoginFormFields } from '../pages/Login';
import { User } from '../helpers/types';
import { saveToLocal } from '../helpers/saveToLocal';

export function useLogin(
  setUser: (user: User) => void,
  setIsLoggedIn: (isLoggedIn: boolean) => void
) {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: (credentials: LoginFormFields) => LoginAPI(credentials),
    onSuccess: async data => {
      const { _id: id } = data.account;
      const { accessToken, refreshToken } = data;

      const user: User = await getUserAPI(id, accessToken);

      setUser(user);
      setIsLoggedIn(true);

      saveToLocal(user, accessToken, refreshToken);

      toast.success(
        `Hello ${data.account.name}! You have successfully logged in 😄`
      );
      navigate('/posts');
    },
  });

  return { login, isPending };
}
