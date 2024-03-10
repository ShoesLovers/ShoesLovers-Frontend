import { CredentialResponse } from '@react-oauth/google';
import apiClient from './apiClient';
import { UpdateFormValues } from '../components/UpdateUserForm';
import { PostFormValues } from '../components/PostForm';
import { User } from '../helpers/types';
import { PostType } from '../helpers/types';
import { LoginProps } from '../helpers/types';
import { RegisterProps } from '../helpers/types';

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

export async function RegisterAPI({
  email,
  password,
  name,
  image,
}: RegisterProps) {
  const response = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
      image,
    }),
  });
  const data = await response.json();
  return data;
}

export async function LogoutAPI() {
  const refreshToken = localStorage.getItem('refreshToken');
  await fetch('http://localhost:3000/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
  return new Promise<User>((resolve, reject) => {
    console.log('getUser ...');
    apiClient
      .get(`/account/${id}`, {
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
export async function createPostAPI(
  accessToken: string,
  postValues: PostFormValues
) {
  return new Promise<PostType>((resolve, reject) => {
    apiClient
      .post('/post', postValues, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${accessToken}`,
        },
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log('test');
        console.log(error);
        reject(error);
      });
  });
}

export async function deletePostAPI(id: string, accessToken: string) {
  console.log('deletePost ...');
  return new Promise<void>((resolve, reject) => {
    apiClient
      .delete(`/post/${id}`, {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      })
      .then(() => {
        console.log('Post deleted successfully!');
        resolve();
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

export function getPostsAPI() {
  const accessToken = localStorage.getItem('accessToken');

  return new Promise<PostType[]>((resolve, reject) => {
    apiClient
      .get('/post', {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      })
      .then(response => {
        resolve(response.data);
        console.log(response.data);
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
    console.log('Uploading photo...' + photo);
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
          console.log(res);
          resolve(res.data.url);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    }
  });
};
