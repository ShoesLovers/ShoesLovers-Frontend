import { CommentType, PostType, User } from '../helpers/types';
import Comment from '../components/Comment';
import { Button, Modal } from 'react-bootstrap';

export default function CommentList({
  refetch,
  post,
  user,
  comments,
  setComments,
  handleCommentsClose,
  showComments,
}: {
  refetch: () => void;
  post: PostType;
  user: User;
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
  handleCommentsClose: () => void;
  showComments: boolean;
}) {
  return (
    <Modal show={showComments} onHide={handleCommentsClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {comments.map(comment => (
          <Comment
            refetch={refetch}
            key={comment._id}
            comment={comment}
            user={user}
            post={post}
            comments={comments}
            setComments={setComments}
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCommentsClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
