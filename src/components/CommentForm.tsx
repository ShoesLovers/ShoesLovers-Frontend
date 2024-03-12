import { Modal, Button, Form } from 'react-bootstrap';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTokens } from '../hooks/useTokens';
import { creatCommentAPI } from '../api/comment_api';
import { CommentType, PostType } from '../helpers/types';
import toast from 'react-hot-toast';
import { getPostById } from '../api/post_api';

const schema = z.object({
  content: z.string().min(1).max(255),
});

export type CommentFormValues = z.infer<typeof schema>;

export default function CommentForm({
  comments,
  setComments,
  setPosts,
  posts,
  post,
  showCommentForm,
  setShowCommentForm,
}: {
  setPosts: (posts: PostType[]) => void;
  posts: PostType[];
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
  post: PostType;
  showCommentForm: boolean;
  setShowCommentForm: (state: boolean) => void;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(schema),
  });
  const { accessToken } = useTokens();
  const onSubmit: SubmitHandler<CommentFormValues> = async data => {
    const newComment = await creatCommentAPI(accessToken, data, post._id);

    setComments([...comments, newComment]);

    const updatedPost = await getPostById(post._id);
    const updatedPosts = posts.map(p =>
      p._id === updatedPost._id ? updatedPost : p
    );
    setPosts(updatedPosts);

    setShowCommentForm(false);
    toast.success('Comment successfully added!');
  };

  return (
    <Modal show={showCommentForm} onHide={() => setShowCommentForm(false)}>
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
            <Button
              variant="secondary"
              onClick={() => setShowCommentForm(false)}
            >
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
