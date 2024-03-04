import { User, dbAccount } from '../App';
import { IUser } from '../api/auth';

export function saveToLocal(data: IUser) {
  const account: dbAccount = data.account;
  const user: User = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    isLoggedIn: true,
    user: account,
  };
  localStorage.setItem('user', JSON.stringify(user));
  return user;
}
