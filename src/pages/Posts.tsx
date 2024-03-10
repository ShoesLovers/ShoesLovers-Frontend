import { useEffect, useState } from 'react';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { PostType } from '../helpers/types';
import { getPostsAPI } from '../api/auth';

export default function Posts() {
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
      <PostForm posts={posts} setPosts={setPosts} />
      <h1>Number or posts: {posts.length}</h1>
      {posts.map(post => (
        <Post key={post._id} post={post} setPosts={setPosts} posts={posts} />
      ))}
    </div>
  );
}
