import { useMutation, useQueryClient } from '@tanstack/react-query';

import { RegisterAPI, RegisterProps } from '../api/auth';

export function useRegister() {
  const queryClient = useQueryClient();
  const { mutate: register, isPending } = useMutation({
    mutationFn: ({ email, password, name }: RegisterProps) =>
      RegisterAPI({ email, password, name }),
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.account);
      alert(
        `Hello ${data.account.name}! You have successfully Created a new Account 😄`
      );
    },
    onError: err => {
      console.error('Error', err);
      alert('Provided credentials are invalid. Please try again.');
    },
  });
  return { register, isPending };
}
