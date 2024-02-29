import { useState } from 'react';
import '../styles/login.css';
import { useLogin } from '../hooks/useLogin';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isPending } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please provide email and password!');
      return;
    }
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  }

  return (
    <>
      {isPending ? (
        <div className="loading">Loading...</div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
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

          <button className="login" disabled={isPending}>
            Log in
          </button>
          {/* <h5 className="or">Or</h5>
          <h5 className="SignUp">Sign in with Google</h5>
          <div className="SignUp" id="signInDiv"></div> */}
        </form>
      )}
    </>
  );
}
