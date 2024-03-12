import { CommentType } from '../helpers/types';
import Comment from '../components/Comment';
import { Modal } from 'react-bootstrap';
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from 'mdb-react-ui-kit';

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
    <Modal show={showComments} onHide={handleCommentsClose}>
      <MDBContainer className="mt-5">
        <MDBRow className="">
          <MDBCol md={8} lg={6}>
            <MDBCard
              className="shadow-0 border"
              style={{
                backgroundColor: '#f0f2f5',
                marginBottom: '20px',
              }}
            >
              <MDBCardBody>
                {comments.map(comment => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    setComments={setComments}
                  />
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Modal>
  );
}
