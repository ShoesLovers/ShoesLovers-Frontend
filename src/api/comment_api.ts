import apiClient from './apiClient';
import { CommentFormValues } from '../components/CommentForm';
import { CommentType } from '../helpers/types';

export async function creatCommentAPI(
  accessToken: string,
  commentValues: CommentFormValues,
  postId: string
) {
  return new Promise<CommentType>((resolve, reject) => {
    apiClient
      .post(`comment/${postId}`, commentValues, {
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
export async function deleteCommentAPI(id: string, accessToken: string) {
  return new Promise<void>((resolve, reject) => {
    apiClient
      .delete(`/comment/${id}`, {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      })
      .then(() => {
        console.log('Comment deleted successfully!');
        resolve();
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}
export async function getCommentsAPI(id: string) {
  return new Promise<CommentType[]>((resolve, reject) => {
    apiClient
      .get(`/comment`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}
