import { useEffect, useState } from 'react';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { PostType, User } from '../helpers/types';
import { getPostsAPI } from '../api/auth';

export default function Posts({
  isLoggedIn,
  user,
  setUser,
}: {
  isLoggedIn: boolean;
  user: User;
  setUser: (user: User) => void;
}) {
  const [posts, setPosts] = useState([] as PostType[]);
  useEffect(() => {
    async function renderPosts() {
      const postsList = await getPostsAPI();
      setPosts(postsList);
    }
    renderPosts();
  }, []);
  return (
    <div>
      {isLoggedIn ? (
        <>
          <PostForm
            posts={posts}
            setPosts={setPosts}
            setUser={setUser}
            user={user}
          />
          <h1>Number or posts: {posts.length}</h1>
          {posts.map(post => (
            <Post
              user={user}
              key={post._id}
              post={post}
              setPosts={setPosts}
              posts={posts}
            />
          ))}
        </>
      ) : (
        <h1>Login to see the posts</h1>
      )}
    </div>
  );
}
