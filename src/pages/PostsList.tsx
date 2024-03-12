import { useEffect, useState } from 'react';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { PostType } from '../helpers/types';
import { getPostsAPI } from '../api/post_api';

const postsFromLocal: PostType[] = JSON.parse(
  localStorage.getItem('posts') || '[]'
);

export default function PostsList({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [posts, setPosts] = useState<PostType[]>(postsFromLocal);

  useEffect(() => {
    async function renderPosts() {
      const postsFromDb: PostType[] = await getPostsAPI();
      setPosts(postsFromDb.reverse());
    }
    renderPosts();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <PostForm posts={posts} setPosts={setPosts} />
          {posts.map(post => (
            <Post
              key={post._id}
              post={post}
              setPosts={setPosts}
              posts={posts}
            />
          ))}
          <h5>Number or posts: {posts.length}</h5>
        </>
      ) : (
        <h1>Login to see the posts</h1>
      )}
    </div>
  );
}
