import { Card, Button } from 'react-bootstrap';
import { CommentType, PostType, User } from '../helpers/types';
import { deletePostAPI } from '../api/post_api';
import { useTokens } from '../hooks/useTokens';
import { useState } from 'react';
import CommentForm from './CommentForm';
import EditPostForm from './EditPostForm';

export default function Post({
  post,
  setPosts,
  posts,
}: {
  posts: PostType[];
  post: PostType;
  setPosts: (posts: PostType[]) => void;
}) {
  const { accessToken } = useTokens();
  const userFromLocal: User = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = userFromLocal._id;

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState([] as CommentType[]);

  const [showEditForm, setShowEditForm] = useState(false);

  const handleShow = () => setShowCommentForm(true);
  const handleClose = () => setShowCommentForm(false);

  const handleDeletePost = async () => {
    await deletePostAPI(post._id, accessToken);
    const updatedPostsArray = posts.filter(p => p._id !== post._id);
    setPosts(updatedPostsArray);
    localStorage.setItem('posts', JSON.stringify(updatedPostsArray));
  };

  return (
    <>
      <center className="mt-3 mb-3">
        <Card style={{ width: '32rem' }}>
          <Card.Img variant="top" src={post.image || ''} />
          <Card.Body>
            <Card.Text>{post.title}</Card.Text>
            <Card.Text>{post.message}</Card.Text>
          </Card.Body>
          <Card.Body>
            {userId === post.owner && (
              <div>
                <Button
                  variant="secondary"
                  onClick={() => setShowEditForm(true)}
                >
                  {' '}
                  Edit Post
                </Button>
                <Button variant="info" onClick={handleDeletePost}>
                  Delete Post
                </Button>
              </div>
            )}
            <Card.Text className="mt-3">
              Comments: {post.comments?.length}
            </Card.Text>
            <Card.Body>
              <Button onClick={handleShow} variant="primary">
                Add Comment
              </Button>
            </Card.Body>

            {/* <Button variant="outline-info">Comments</Button> */}
          </Card.Body>
        </Card>
      </center>

      {showEditForm && (
        <EditPostForm
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
          posts={posts}
          setPosts={setPosts}
          post={post}
        />
      )}

      {showCommentForm && (
        <CommentForm
          show={showCommentForm}
          setPosts={setPosts}
          setComments={setComments}
          post={post}
          comments={comments!}
          posts={posts}
          handleClose={handleClose}
        />
      )}
    </>
  );
}
