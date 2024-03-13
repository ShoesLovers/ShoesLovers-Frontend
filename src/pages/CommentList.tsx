import { CommentType } from '../helpers/types';
import Comment from '../components/Comment';
import { Button, Modal } from 'react-bootstrap';

export default function CommentList({
  comments,

  handleCommentsClose,
  showComments,
}: {
  comments: CommentType[];

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
          <Comment key={comment._id} comment={comment} user={comment.writer} />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
