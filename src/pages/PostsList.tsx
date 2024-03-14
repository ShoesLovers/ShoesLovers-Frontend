import Post from '../components/Post';
import PostForm from '../components/PostForm';
import usePosts from '../hooks/usePosts';
import MySpinner from '../components/MySpinner';
import { User } from '../helpers/types';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function PostsList({
  isLoggedIn,
  user,
}: {
  isLoggedIn: boolean;
  user: User;
}) {
  const { posts, setPosts, isPending, refetch } = usePosts();
  const [showMyPosts, setShowMyPosts] = useState(false);
  const myPosts = posts.filter(post => post.owner._id === user._id);

  if (isPending) {
    return <MySpinner />;
  }

  return (
    <div>
      <center>
        <Button onClick={() => setShowMyPosts(!showMyPosts)}>
          {showMyPosts ? 'Show all posts' : 'Show my posts'}
        </Button>
      </center>
      {isLoggedIn && !showMyPosts && (
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
      )}

      {isLoggedIn && showMyPosts && (
        <>
          <h1>My posts ({myPosts.length})</h1>
          {myPosts.map(post => (
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
      )}
    </div>
  );
}
