import { Modal, Button, Form } from 'react-bootstrap';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTokens } from '../hooks/useTokens';
import { creatCommentAPI } from '../api/comment_api';
import { CommentType, PostType } from '../helpers/types';

const schena = z.object({
  content: z.string().min(1).max(255),
});

export type CommentFormValues = z.infer<typeof schena>;

export default function CommentForm({
  show,
  handleClose,
  comments,
  setComments,
  setPosts,
  posts,
  post,
}: {
  show: boolean;
  handleClose: () => void;

  setPosts: (posts: PostType[]) => void;
  posts: PostType[];
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
  post: PostType;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(schena),
  });
  const { accessToken } = useTokens();
  const onSubmit: SubmitHandler<CommentFormValues> = async data => {
    const newComment = await creatCommentAPI(accessToken, data, post._id);
    const updatedPost = {
      ...post,
      comments: [...(post.comments || []), newComment],
    };
    setPosts([...posts, updatedPost]);
    setComments([...comments, newComment]);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="textarea">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register('content')}
              placeholder="write your comment here"
            />
            {errors.content && <Form.Text>{errors.content.message}</Form.Text>}
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
