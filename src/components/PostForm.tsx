import { Button, Card, Form, Modal } from 'react-bootstrap';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostType } from '../helpers/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { useTokens } from '../hooks/useTokens';
import { uploadPhoto } from '../api/auth_api';
import { createPostAPI } from '../api/post_api';
import toast from 'react-hot-toast';

const schema = z.object({
  image: z.string().optional(),
  message: z.string().min(1).max(255),
  title: z.string().min(1).max(255),
});

export type PostFormValues = z.infer<typeof schema>;

export default function PostForm({
  setIsLoading,
  showAddPostForm,
  setShowAddForm,
  setPosts,
  posts,
  refetch,
}: {
  setIsLoading: (state: boolean) => void;
  showAddPostForm: boolean;
  setShowAddForm: (state: boolean) => void;
  setPosts: (posts: PostType[]) => void;
  posts: PostType[];
  refetch: () => void;
}) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(schema),
  });
  const { accessToken } = useTokens();
  const [image, setImage] = useState<File>();

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setValue('image', URL.createObjectURL(file));
  };

  const onSubmit: SubmitHandler<PostFormValues> = async data => {
    setIsLoading(true);
    let url;
    if (image) {
      url = await uploadPhoto(image);
    }
    setValue('image', url);
    const newData = { ...data, image: url };
    const newPost = await createPostAPI(accessToken, newData);

    setPosts([...posts, newPost]);

    setValue('image', '');
    setValue('title', '');
    setValue('message', '');
    setImage(undefined);
    refetch();
    toast.success('Post successfully created!');
    setShowAddForm(false);

    setIsLoading(false);
  };

  return (
    <Modal show={showAddPostForm} onHide={() => setShowAddForm(false)}>
      <Modal.Header closeButton>
        <Modal.Title>New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>Upload post image</Form.Label>
            <Card.Img
              variant="top"
              src={image ? URL.createObjectURL(image) : ''}
            />
            <Form.Control type="file" onChange={handleImage} />
            {errors.image && <Form.Text>{errors.image.message}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Control
              type="text"
              {...register('title')}
              placeholder="Post Title"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="textarea">
            <Form.Control
              as="textarea"
              rows={10}
              {...register('message')}
              placeholder="Post Message"
              style={{ height: '150px' }}
            />
            {errors.message && <Form.Text>{errors.message.message}</Form.Text>}
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddForm(false)}>
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
