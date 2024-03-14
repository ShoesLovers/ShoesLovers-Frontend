import Post from '../components/Post';
import PostForm from '../components/PostForm';
import usePosts from '../hooks/usePosts';
import MySpinner from '../components/MySpinner';
import { User } from '../helpers/types';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { MdPostAdd } from 'react-icons/md';

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
  const [showAddPostForm, setShowAddPostForm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  if (isPending || isLoading) {
    return <MySpinner />;
  }

  return (
    <div>
      <center>
        <Button
          onClick={() => setShowMyPosts(!showMyPosts)}
          variant="outline-dark"
        >
          {showMyPosts ? 'All Posts' : 'My Posts'}
        </Button>

        <MdPostAdd
          onClick={() => setShowAddPostForm(true)}
          style={{
            fontSize: '4em',
            cursor: 'pointer',
            marginLeft: '20px',
          }}
        />
      </center>
      {isLoggedIn && !showMyPosts && (
        <>
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

      {isLoggedIn && showAddPostForm && (
        <PostForm
          setIsLoading={setIsLoading}
          refetch={refetch}
          posts={posts}
          setPosts={setPosts}
          showAddPostForm={showAddPostForm}
          setShowAddForm={setShowAddPostForm}
        />
      )}

      {isLoggedIn && showMyPosts && (
        <>
          <center>
            <h1>My posts ({myPosts.length})</h1>
          </center>
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
