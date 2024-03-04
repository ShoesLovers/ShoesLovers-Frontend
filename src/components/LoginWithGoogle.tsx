import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

export default function LoginWithGoogle() {
  const onSuccess = (response: CredentialResponse) => {
    console.log(response);
  };
  const onFailure = () => {
    console.log('Failed to login with Google');
  };
  return <GoogleLogin onSuccess={onSuccess} onError={onFailure} />;
}
