import { CredentialResponse } from '@react-oauth/google';
import apiClient from './apiClient';
import { UpdateFormValues } from '../components/UpdateUserForm';
import { User } from '../helpers/types';
import { LoginProps } from '../helpers/types';
import { RegisterProps } from '../helpers/types';

export async function LoginAPI({ email, password }: LoginProps) {
  const response = await apiClient.post('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.data;
  return data;
}

export async function RegisterAPI({
  email,
  password,
  name,
  image,
}: RegisterProps) {
  const response = await apiClient.post('/auth/register', {
    email,
    password,
    name,
    image,
  });
  const data = await response.data;
  return data;
}

export async function LogoutAPI() {
  const refreshToken = localStorage.getItem('refreshToken');
  await apiClient.post('/auth/logout', null, {
    headers: {
      Authorization: `JWT ${refreshToken}`,
    },
  });
}

export async function LoginWithGoogleAPI<User>(credential: CredentialResponse) {
  return new Promise<User>((resolve, reject) => {
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

export async function getUserAPI(id: string, accessToken: string) {
  const response = await apiClient.get(`/account/${id}`, {
    headers: {
      Authorization: `JWT ${accessToken}`,
    },
  });
  return response.data;
}

export async function UpdateUserAPI(
  id: string,
  accessToken: string,
  updatedUser: UpdateFormValues
) {
  return new Promise<User>((resolve, reject) => {
    console.log('updateUser ...');
    apiClient
      .put(`/account/${id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${accessToken}`,
        },
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

interface IUpoloadResponse {
  url: string;
}
export const uploadPhoto = async (photo: File) => {
  return new Promise<string>((resolve, reject) => {
    console.log('Uploading photo...');
    const formData = new FormData();
    if (photo) {
      formData.append('file', photo);
      apiClient
        .post<IUpoloadResponse>('file?file=123.jpeg', formData, {
          headers: {
            'Content-Type': 'image/jpeg',
          },
        })
        .then(res => {
          resolve(res.data.url);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    }
  });
};
