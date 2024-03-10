import { Card, Button } from 'react-bootstrap';
import { PostType, User } from '../helpers/types';
import { deletePostAPI } from '../api/auth';
import { useTokens } from '../hooks/useTokens';
import Comments from './Comments';
import { useState } from 'react';
import AddComment from './AddComment';

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

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDeletePost = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await deletePostAPI(post._id, accessToken);
    setPosts([...posts.filter(p => p._id !== post._id)]);
  };

  return (
    <center className="mt-3 mb-3">
      <Card style={{ width: '32rem' }}>
        {/* <Card.Img
          variant="top"
          src="src\assets\images\Labrador_Retriever_portrait.jpg"
        /> */}
        <Card.Body>
          <Card.Text>{post.title}</Card.Text>
          <Card.Text>{post.message}</Card.Text>
        </Card.Body>
        <Card.Body>
          {userId === post.owner && (
            <div>
              <Button variant="secondary"> Edit Post</Button>
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
            {show && <AddComment show={show} handleClose={handleClose} />}
          </Card.Body>
          <Comments />
          {/* <Button variant="outline-info">Comments</Button> */}
        </Card.Body>
      </Card>
    </center>
  );
}
