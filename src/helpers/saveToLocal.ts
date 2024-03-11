import { User } from './types';

export function saveToLocal(
  user: User,
  accessToken: string,
  refreshToken: string
) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function removeFromLocal(...keys: string[]) {
  keys.forEach(key => {
    localStorage.removeItem(key);
  });
}
