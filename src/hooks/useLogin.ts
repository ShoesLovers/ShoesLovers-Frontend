import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LoginAPI } from '../api/auth';
import toast from 'react-hot-toast';
import { FormFields } from '../pages/Login';
import { User, dbAccount } from '../App';

export function useLogin(setUser: (user: User) => void) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: (credentials: FormFields) => LoginAPI(credentials),
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.account);
      const account: dbAccount = data.account;
      const user: User = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isLoggedIn: true,
        user: account,
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(
        `Hello ${data.account.name}! You have successfully logged in 😄`
      );
      navigate('/myaccount');
    },
  });

  return { login, isPending };
}
