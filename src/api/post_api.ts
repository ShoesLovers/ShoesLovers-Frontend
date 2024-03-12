import { PostFormValues } from '../components/PostForm';
import { UpdateFormValues } from '../components/UpdateUserForm';
import { PostType } from '../helpers/types';
import apiClient from './apiClient';

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
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

export async function editPostAPI(
  id: string,
  accessToken: string,
  postValues: UpdateFormValues
) {
  console.log(postValues);
  return new Promise<PostType>((resolve, reject) => {
    apiClient
      .put(`/post/${id}`, postValues, {
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
