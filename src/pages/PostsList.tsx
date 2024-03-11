import { useEffect } from 'react';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { PostType, User } from '../helpers/types';
import { getPostsAPI } from '../api/post';

export default function PostsList({
  isLoggedIn,
  user,
  setUser,
  posts,
  setPosts,
}: {
  isLoggedIn: boolean;
  user: User;
  setUser: (user: User) => void;
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
}) {
  useEffect(() => {
    async function renderPosts() {
      const postsFromDb: PostType[] = await getPostsAPI();
      setPosts(postsFromDb);
    }
    renderPosts();
  }, [setPosts]);

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
              setUser={setUser}
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
