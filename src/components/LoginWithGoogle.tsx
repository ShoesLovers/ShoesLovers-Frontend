import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { LoginWithGoogleAPI } from '../api/auth';
import { User } from '../App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function LoginWithGoogle({
  setUser,
}: {
  setUser: (user: User) => void;
}) {
  const navigate = useNavigate();
  const onSuccess = async (response: CredentialResponse) => {
    try {
      const res = await LoginWithGoogleAPI(response);
      const account = res.account;
      console.log(account);
      const user: User = {
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        isLoggedIn: true,
        user: account,
      };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success(
        `Hello ${account.name}! You have successfully logged in 😄`
      );
      navigate('/myaccount');
    } catch (err) {
      console.log(err);
    }
  };
  const onFailure = () => {
    console.log('Failed to login with Google');
  };
  return <GoogleLogin onSuccess={onSuccess} onError={onFailure} />;
}
