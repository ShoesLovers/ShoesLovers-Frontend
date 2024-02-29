import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LoginAPI, LoginProps } from '../api/auth';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginProps) =>
      LoginAPI({ email, password }),
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.account);
      toast.success(
        `Hello ${data.account.name}! You have successfully logged in 😄`
      );
    },
    onError: err => {
      console.error('Error', err);
      toast.error('Provided email or password are incorrect');
    },
  });
  return { login, isPending };
}
