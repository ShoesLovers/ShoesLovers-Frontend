import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { LoginWithGoogleAPI, User } from '../api/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { saveToLocal } from '../helpers/saveToLocal';

export default function LoginWithGoogle({
  setUser,
}: {
  setUser: (user: User) => void;
}) {
  const navigate = useNavigate();
  const onSuccess = async (response: CredentialResponse) => {
    try {
      const res = await LoginWithGoogleAPI(response);
      const user = saveToLocal(res);
      setUser(user);
      toast.success(
        `Hello ${res.account.name}! You have successfully logged in 😄`
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
