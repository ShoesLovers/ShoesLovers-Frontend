import { CommentType } from '../helpers/types';
import Comment from '../components/Comment';
import { Dropdown, DropdownItem, Modal } from 'react-bootstrap';

export default function CommentList({
  comments,
  setComments,
  handleCommentsClose,
  showComments,
}: {
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
  handleCommentsClose: () => void;
  showComments: boolean;
}) {
  return (
    <div>
      {comments.map(comment => (
        <Comment
          key={comment._id}
          comment={comment}
          setComments={setComments}
        />
      ))}
    </div>
  );
}
