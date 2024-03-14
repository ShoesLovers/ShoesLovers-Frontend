import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { LoginWithGoogleAPI } from '../api/auth_api';
import { UserWithTokens } from '../helpers/types';
import { User } from '../helpers/types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function LoginWithGoogle({
  setIsLoading,
  setUser,
  setIsLoggedIn,
}: {
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: User) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}) {
  const navigate = useNavigate();
  const onSuccess = async (response: CredentialResponse) => {
    setIsLoading(true);
    try {
      const userWithToken: UserWithTokens = await LoginWithGoogleAPI(response);
      const { account: user, accessToken, refreshToken } = userWithToken;
      setUser(user);
      setIsLoggedIn(true);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);

      toast.success(`Hello ${user.name}! You have successfully logged in 😄`);
      navigate('/posts');
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  const onFailure = () => {
    console.log('Failed to login with Google');
  };
  return (
    <GoogleLogin
      useOneTap={true}
      shape="circle"
      size="large"
      onSuccess={onSuccess}
      onError={onFailure}
      width={200}
      logo_alignment="center"
    />
  );
}
