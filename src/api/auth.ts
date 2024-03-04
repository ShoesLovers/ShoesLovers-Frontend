import { CredentialResponse } from '@react-oauth/google';

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  email: string;
  password: string;
  name: string;
}

export async function LoginAPI({ email, password }: LoginProps) {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
}

export async function RegisterAPI({ email, password, name }: RegisterProps) {
  const response = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });
  const data = await response.json();
  return data;
}

export async function LogoutAPI() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const refreshToken = user.refreshToken;
  await fetch('http://localhost:3000/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${refreshToken}`,
    },
  });
}

export async function LoginWithGoogleAPI(credential: CredentialResponse) {
  const response = await fetch('http://localhost:3000/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}
