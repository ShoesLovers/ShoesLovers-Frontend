import { CredentialResponse } from '@react-oauth/google';
import apiClient from './apiClient';

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  email: string;
  password: string;
  name: string;
}

export type dbAccount = {
  name: string;
  email: string;
  _id: string;
  image: string;
  password: string;
};

export interface IUser {
  account: dbAccount;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  accessToken: string;
  refreshToken: string;
  isLoggedIn?: boolean;
  user: dbAccount;
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
  return new Promise<IUser>((resolve, reject) => {
    console.log('googleSignin ...');
    apiClient
      .post('/auth/google', credential)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}
