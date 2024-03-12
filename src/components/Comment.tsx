import { Card, Dropdown } from 'react-bootstrap';
import { CommentType, PostType } from '../helpers/types';
import { deleteCommentAPI } from '../api/comment_api';
import { useTokens } from '../hooks/useTokens';
// import { PostType } from "../helpers/types";

export default function Comment({
  comment,
  setComments,
  comments,
  post,
  posts,
  setPosts,
}: {
  comment: CommentType;
  setComments: (comments: CommentType[]) => void;
  comments: CommentType[];
  post: PostType;
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
}) {
  const { accessToken } = useTokens();
  const handleShow = () => setShowComment(true);
  const handleClose = () => setShowComment(false);
  const handleDeleteComment = async () => {
    await deleteCommentAPI(comment._id, accessToken);
    const updatedComments = comments.filter(
      (commentItem: CommentType) => commentItem._id !== comment._id
    );
    setComments(updatedComments);
    const updatedPost = {
      ...post,
      comments: updatedComments,
    };
    setPosts([...posts, updatedPost]);
  };
  return (
    <Card>
      <Dropdown>
        <Dropdown.Toggle
          style={{ width: '30rem' }}
          variant="success"
          id="dropdown-basic"
        >
          Comments
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {/* {PostType.comments?.map((comment, index) => ( */}
          {/* <Dropdown.Item key={index}>{comment}</Dropdown.Item> */}
          {/* ))} */}
        </Dropdown.Menu>
      </Dropdown>
    </Card>
  );
}
