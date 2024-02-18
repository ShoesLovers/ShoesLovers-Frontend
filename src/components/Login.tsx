import { useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
import '../styles//login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       '1034636988647-e1rdhb99tt0o8jtbmpneckk0f0qpo7us.apps.googleusercontent.com',
  //     callback: handleCallbackResponse,
  //   });
  //   google.accounts.id.renderButton(document.getElementById('signInDiv'), {
  //     theme: 'outline',
  //     size: 'large',
  //   });
  // }, []);

  // function handleCallbackResponse(response: any) {
  //   console.log(response.credential);
  //   const user = jwtDecode(response.credential);
  //   handleGoogleLogin();
  // }

  // async function handleGoogleLogin() {
  //   try {
  //     const response = await fetch('http://localhost:3000/auth/google', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     // TODO Move to Main page
  //   } catch (err) {
  //     alert('Wrong email or password!');
  //   }
  // }

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
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <span className="password_span">Password</span>
        <input
          name="password"
          className="password_input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="logIn">Log in</button>
        <h5 className="or">Or</h5>
        <h5 className="SignUp">Sign in with Google</h5>
        <div className="SignUp" id="signInDiv"></div>
      </form>
    </>
  );
}
export default Login;
