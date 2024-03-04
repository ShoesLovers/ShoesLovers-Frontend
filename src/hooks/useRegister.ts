import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { User } from '../App';
import { RegisterAPI } from '../api/auth';
import toast from 'react-hot-toast';
import { RegisterFormFields } from '../pages/Register';
import { saveToLocal } from '../helpers/saveToLocal';

export function useRegister(setUser: (user: User) => void) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: register, isPending } = useMutation({
    mutationFn: (credentials: RegisterFormFields) => RegisterAPI(credentials),
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.account);
      const user = saveToLocal(data);
      setUser(user);
      toast.success(
        `Hello ${data.account.name}! You have successfully Created a new Account 😄`
      );
      navigate('/myaccount');
    },
  });
  return { register, isPending };
}
