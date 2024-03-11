import { UpdateFormValues } from '../components/UpdateUserForm';
import { User } from '../helpers/types';
import apiClient from './apiClient';

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
