import { CommentType, PostType, User } from '../helpers/types';
import { deletePostAPI } from '../api/post_api';
import { useTokens } from '../hooks/useTokens';
import { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import EditPostForm from './EditPostForm';
import CommentList from '../pages/CommentList';
import MySpinner from './MySpinner';
import toast from 'react-hot-toast';
import PostStyled from './PostStyled';

export default function Post({
  user,
  post,
  setPosts,
  posts,
  refetch,
}: {
  user: User;
  posts: PostType[];
  post: PostType;
  refetch: () => void;
  setPosts: (posts: PostType[]) => void;
}) {
  const { accessToken } = useTokens();
  const userFromLocal: User = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = userFromLocal._id;

  const [isLoading, setIsLoading] = useState(false);

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState([] as CommentType[]);

  const [showEditForm, setShowEditForm] = useState(false);

  const handleCommentFormShow = () => setShowCommentForm(true);
  const handleCommentFormClose = () => setShowCommentForm(false);

  const handleCommentsShow = () => setShowComments(true);
  const handleCommentsClose = () => setShowComments(false);

  const handleDeletePost = async () => {
    setIsLoading(true);
    await deletePostAPI(post._id, accessToken);
    const updatedPostsArray = posts.filter(p => p._id !== post._id);
    setPosts(updatedPostsArray);
    refetch();
    toast.success('Post successfully deleted!');
    setIsLoading(false);
  };

  useEffect(() => {
    setComments(post.comments || []);
  }, [post.comments]);

  if (isLoading) {
    return <MySpinner />;
  }

  return (
    <>
      <PostStyled
        userId={userId}
        post={post}
        handleCommentFormShow={handleCommentFormShow}
        handleDeletePost={handleDeletePost}
        setShowEditForm={setShowEditForm}
        handleCommentsShow={handleCommentsShow}
      />

      {showEditForm && (
        <EditPostForm
          setIsLoading={setIsLoading}
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
          posts={posts}
          setPosts={setPosts}
          post={post}
        />
      )}

      {showCommentForm && (
        <CommentForm
          setIsLoading={setIsLoading}
          showCommentForm={showCommentForm}
          setPosts={setPosts}
          setComments={setComments}
          post={post}
          comments={comments!}
          posts={posts}
          setShowCommentForm={handleCommentFormClose}
        />
      )}

      {showComments && (
        <CommentList
          refetch={refetch}
          post={post}
          user={user}
          comments={comments}
          setComments={setComments}
          handleCommentsClose={handleCommentsClose}
          showComments={showComments}
        />
      )}
    </>
  );
}
