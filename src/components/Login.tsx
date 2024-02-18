import { useEffect, useState } from 'react';
import '../styles//login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSumbitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return alert('Please fill in all fields');
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const { accessToken, refreshToken } = await response.json();
      console.log(accessToken, refreshToken);
      // TODO Move to Main page
    } catch (err) {
      alert('Wrong email or password!');
    }
  }

  return (
    <>
      <form
        className="form"
        onSubmit={e => {
          handleSumbitLogin(e);
        }}
      >
        <h2 className="title">Shoes Lovers</h2>
        <h3 className="welcome">Welcome Back!</h3>

        <span className="email_span">Email</span>
        <input
          name="email"
          className="email_input"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />

        <span className="password_span">Password</span>
        <input
          type="password"
          name="password"
          value={password}
          className="password_input"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="logIn">Log in</button>
        <h5 className="or">Or</h5>
        <h5 className="SignUp">Don’t have acount ? </h5>
        {/* <button className="SignUp">Sign Up</button> */}
      </form>
    </>
  );
}
export default Login;
