import { CommentType, PostType, User } from '../helpers/types';
import { MDBCard, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';
import { TiDelete } from 'react-icons/ti';
import { MdModeEditOutline } from 'react-icons/md';
import { deleteCommentAPI } from '../api/comment_api';
import toast from 'react-hot-toast';
import MySpinner from './MySpinner';
import { useState } from 'react';
import EditCommentForm from './EditCommentForm';
export default function Comment({
  refetch,
  comment,
  user,
  post,
  comments,
  setComments,
}: {
  refetch: () => void;
  comment: CommentType;
  user: User;
  post: PostType;
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
}) {
  // Allow edit only if the comment's writer is the current user
  const allowEdit = comment.writer._id === user._id;
  // Allow delete only if the comment's writer is the current user or the post's owner is the current user
  const allowDelete =
    comment.writer._id === user._id || post.owner._id === user._id;

  const [isLoading, setIsLoading] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);

  const handleDeleteComment = async () => {
    setIsLoading(true);
    try {
      await deleteCommentAPI(comment._id);
      const updatedCommentsArray = comments.filter(c => c._id !== comment._id);
      setComments(updatedCommentsArray);
      toast.success('Comment successfully deleted!');
      refetch();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  if (isLoading) return <MySpinner />;

  return (
    <>
      <MDBCard className="mb-4 position-relative">
        <MDBCardBody>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <MDBCardImage
                src={comment.writer.image}
                alt="avatar"
                width="30"
                height="30"
                className="rounded-circle me-2"
              />
              <strong>
                <p className="small mb-0 ms-2">{comment.writer.name}</p>
              </strong>
            </div>
            <div
              className="position-absolute top-0 end-0 mt-1 me-2"
              style={{ fontSize: '1.5rem', cursor: 'pointer' }}
            >
              {allowEdit && (
                <MdModeEditOutline onClick={() => setShowEditComment(true)} />
              )}
              {allowDelete && <TiDelete onClick={handleDeleteComment} />}
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mt-2">
            <p className=" text-muted">{comment.content}</p>
          </div>
        </MDBCardBody>
      </MDBCard>
      {showEditComment && (
        <EditCommentForm
          refetch={refetch}
          comments={comments}
          setComments={setComments}
          setIsLoading={setIsLoading}
          setShowEditComment={setShowEditComment}
          showEditComment={showEditComment}
          comment={comment}
        />
      )}
    </>
  );
}
