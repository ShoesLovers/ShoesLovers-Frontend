import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { RegisterAPI, RegisterProps } from '../api/auth';
import toast from 'react-hot-toast';

export function useRegister() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: register, isPending } = useMutation({
    mutationFn: ({ email, password, name }: RegisterProps) =>
      RegisterAPI({ email, password, name }),
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.account);
      toast.success(
        `Hello ${data.account.name}! You have successfully Created a new Account 😄`
      );
      navigate('/myaccount');
    },
  });
  return { register, isPending };
}
