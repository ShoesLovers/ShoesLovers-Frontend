import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { RegisterAPI } from '../api/auth';
import { User } from '../helpers/types';
import toast from 'react-hot-toast';
import { RegisterFormFields } from '../pages/Register';
import { saveToLocal } from '../helpers/saveToLocal';

export function useRegister(
  setUser: (user: User) => void,
  setIsLoggedIn: (isLoggedIn: boolean) => void
) {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useMutation({
    mutationFn: (credentials: RegisterFormFields) => RegisterAPI(credentials),
    onSuccess: data => {
      const user = data.account;
      const { accessToken, refreshToken } = data;

      setUser(user);
      setIsLoggedIn(true);

      saveToLocal(user, accessToken, refreshToken);

      toast.success(
        `Hello ${user.name}! You have successfully Created a new Account 😄`
      );
      navigate('/posts');
    },
  });
  return { register, isPending };
}
