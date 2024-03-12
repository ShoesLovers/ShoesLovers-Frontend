export type User = {
  email: string;
  image?: string;
  name: string;
  password: string;
  posts: PostType[];
  refreshTokens?: string[];
  __v?: number;
  _id: string;
};
export type PostType = {
  _id: string;
  image?: string;
  message: string;
  owner: User;
  comments?: CommentType[];
  title: string;
  __v?: number;
};
export type CommentType = {
  _id: string;
  content: string;
  writer: User;
  postId: string;
};
export type UserWithTokens = {
  account: User;
  accessToken: string;
  refreshToken: string;
};

export type userProps = {
  user: User;
  setUser: (user: User) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  email: string;
  password: string;
  name: string;
  image?: string;
}
