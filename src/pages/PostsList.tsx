import Post from '../components/Post';
import PostForm from '../components/PostForm';
import usePosts from '../hooks/usePosts';
import MySpinner from '../components/MySpinner';
import { User } from '../helpers/types';

export default function PostsList({
  isLoggedIn,
  user,
}: {
  isLoggedIn: boolean;
  user: User;
}) {
  const { posts, setPosts, isPending, refetch } = usePosts();

  if (isPending) {
    return <MySpinner />;
  }

  return (
    <div>
      {isLoggedIn ? (
        <>
          <PostForm posts={posts} setPosts={setPosts} refetch={refetch} />
          <center>
            <h3>Number of posts: {posts.length}</h3>
          </center>
          {posts.map(post => (
            <Post
              user={user}
              key={post._id}
              post={post}
              setPosts={setPosts}
              posts={posts}
              refetch={refetch}
            />
          ))}
        </>
      ) : (
        <h1>Login to see the posts</h1>
      )}
    </div>
  );
}
