import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LoginAPI, LoginProps } from '../api/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginProps) =>
      LoginAPI({ email, password }),
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.account);
      toast.success(
        `Hello ${data.account.name}! You have successfully logged in 😄`
      );
      navigate('/myaccount');
    },
  });
  return { login, isPending };
}
