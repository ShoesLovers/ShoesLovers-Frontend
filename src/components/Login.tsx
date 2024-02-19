import { useState } from 'react';
import '../styles/login.css';
import { useMutation } from '@tanstack/react-query';
import LoginAPI from '../api/auth';

function Login({ setAccessToken, setRefreshToken, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: LoginAPI,
    onSuccess: data => {
      const { account: user, accessToken, refreshToken } = data;
      setUser(user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    },
    onSettled: () => {
      setEmail('');
      setPassword('');
    },
  });

  return (
    <>
      {isPending ? (
        <span>Loading...</span>
      ) : (
        <form
          className="form"
          onSubmit={async e => {
            e.preventDefault();
            login({ email, password });
          }}
        >
          <h2 className="title">Shoes Lovers</h2>
          <h3 className="welcome">Welcome Back!</h3>

          <span className="email_span">Email</span>
          <input
            disabled={isPending}
            name="email"
            className="email_input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <span className="password_span">Password</span>
          <input
            disabled={isPending}
            name="password"
            className="password_input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="logIn" disabled={isPending}>
            Log in
          </button>
          <h5 className="or">Or</h5>
          <h5 className="SignUp">Sign in with Google</h5>
          <div className="SignUp" id="signInDiv"></div>
        </form>
      )}
    </>
  );
}
export default Login;
