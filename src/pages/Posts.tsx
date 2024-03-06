import { useEffect } from "react";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import { PostType } from "../helpers/types";
import { getPostsAPI } from "../api/auth";
import { useTokens } from "../hooks/useTokens";

export default function Posts({
  posts,
  setPosts,
}: {
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
}) {
  const { accessToken } = useTokens();
  useEffect(() => {
    async function renderPosts() {
      const posts = await getPostsAPI(accessToken);
      setPosts(posts);
    }
    renderPosts();
  }, [accessToken, setPosts]);
  return (
    <div>
      <PostForm posts={posts} setPosts={setPosts} />
      <h1>Number or posts: {posts.length}</h1>
      {posts.map((post) => (
        <Post key={post._id} post={post} setPosts={setPosts} posts={posts} />
      ))}
    </div>
  );
}
