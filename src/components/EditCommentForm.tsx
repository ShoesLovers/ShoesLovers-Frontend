import { Button, Form, Modal } from 'react-bootstrap';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CommentType } from '../helpers/types';
import { updateCommentAPI } from '../api/comment_api';
import toast from 'react-hot-toast';

const schema = z.object({
  content: z.string().min(1).max(255),
});

export type CommentFormValues = z.infer<typeof schema>;

export default function EditCommentForm({
  refetch,
  comments,
  setComments,
  setIsLoading,
  showEditComment,
  setShowEditComment,
  comment,
}: {
  refetch: () => void;
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
  setIsLoading: (state: boolean) => void;
  showEditComment: boolean;
  setShowEditComment: (state: boolean) => void;
  comment: CommentType;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<CommentFormValues> = async data => {
    setIsLoading(true);
    try {
      await updateCommentAPI(comment._id, data);
      toast.success('Comment successfully updated!');
      setShowEditComment(false);
      const newComment: CommentType = { ...comment, content: data.content };
      const updatedComments = comments.map(c =>
        c._id === newComment._id ? newComment : c
      );
      setComments(updatedComments);
      refetch();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <Modal show={showEditComment} onHide={() => setShowEditComment(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="textarea">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register('content')}
              placeholder={comment.content}
            />
            {errors.content && <Form.Text>{errors.content.message}</Form.Text>}
          </Form.Group>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowEditComment(false)}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
