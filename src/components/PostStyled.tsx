import { Card, ListGroup } from 'react-bootstrap';
import { PostType } from '../helpers/types';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { BiCommentAdd } from 'react-icons/bi';
import { FaRegComments } from 'react-icons/fa';

export default function PostStyled({
  userId,
  post,
  handleDeletePost,
  setShowEditForm,
  handleCommentsShow,
  handleCommentFormShow,
}: {
  userId: string;
  post: PostType;
  handleCommentFormShow: () => void;
  handleDeletePost: () => void;
  setShowEditForm: (value: boolean) => void;
  handleCommentsShow: () => void;
}) {
  return (
    <center>
      <Card
        style={{
          width: '25rem',
          marginBottom: '30px',
          marginTop: '30px',
        }}
      >
        <Card.Title
          className="d-flex align-items-center mt-3 mb-3"
          style={{
            marginLeft: '10px',
          }}
        >
          <div
            style={{
              marginLeft: '10px',
            }}
          >
            <Card.Img
              src={post.owner.image}
              style={{ width: '40px' }}
              className="rounded-circle"
            />
            <span
              style={{
                marginLeft: '10px',
              }}
            >
              {post.owner.name}{' '}
            </span>
          </div>
        </Card.Title>
        <Card.Img variant="top" src={post.image || ''} />

        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.message}</Card.Text>
        </Card.Body>

        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            {userId === post.owner._id && (
              <>
                <FaRegEdit
                  onClick={() => setShowEditForm(true)}
                  size={30}
                  style={{
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                />
                <MdDeleteOutline
                  onClick={handleDeletePost}
                  size={30}
                  style={{
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                />
              </>
            )}

            <BiCommentAdd
              onClick={handleCommentFormShow}
              size={30}
              style={{
                cursor: 'pointer',
                marginRight: '10px',
              }}
            />
          </ListGroup.Item>

          <ListGroup.Item>
            <Card.Text>
              <FaRegComments
                onClick={handleCommentsShow}
                size={30}
                style={{
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              />
              <strong>: {post.comments?.length}</strong>
            </Card.Text>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </center>
  );
}
