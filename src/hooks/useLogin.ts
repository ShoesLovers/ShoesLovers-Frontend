import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LoginAPI } from '../api/auth';
import toast from 'react-hot-toast';
import { LoginFormFields } from '../pages/Login';
import { User } from '../App';
import { saveToLocal } from '../helpers/saveToLocal';

export function useLogin(setUser: (user: User) => void) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: (credentials: LoginFormFields) => LoginAPI(credentials),
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.account);
      const user = saveToLocal(data);
      setUser(user);
      toast.success(
        `Hello ${data.account.name}! You have successfully logged in 😄`
      );
      navigate('/myaccount');
    },
  });

  return { login, isPending };
}