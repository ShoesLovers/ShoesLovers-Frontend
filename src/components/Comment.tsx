import { MDBCard, MDBCardBody, MDBCardImage, MDBIcon } from 'mdb-react-ui-kit';
import { CommentType } from '../helpers/types';
import { MdDelete } from 'react-icons/md';
export default function Comment({
  comment,
  setComments,
}: {
  comment: CommentType;
  setComments: (comments: CommentType[]) => void;
}) {
  return (
    <MDBCard className="mb-4 mt-4">
      <MDBCardBody>
        <p>{comment.content}</p>

        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <MDBCardImage
              src={comment.writer.image}
              alt="avatar"
              width="20px"
              height="20px"
              className="rounded-circle me-2"
            />
            <p className="small mb-0 ">{comment.writer.name}</p>
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}
