import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { PostType } from '../helpers/types';
import { uploadPhoto } from '../api/auth_api';
import { editPostAPI } from '../api/post_api';
import { useTokens } from '../hooks/useTokens';
import toast from 'react-hot-toast';

const schema = z.object({
  image: z.string().optional().nullable(),
  message: z.string().min(1).max(255).optional().or(z.literal('')),
  title: z.string().min(1).max(255).optional().or(z.literal('')),
});

export type PostFormValues = z.infer<typeof schema>;

export default function EditPostForm({
  post,
  posts,
  setPosts,
  showEditForm,
  setShowEditForm,
}: {
  post: PostType;
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
  showEditForm: boolean;
  setShowEditForm: (state: boolean) => void;
}) {
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(schema),
  });

  const [image, setImage] = useState<File>();
  const { accessToken } = useTokens();

  const onSubmit: SubmitHandler<PostFormValues> = async data => {
    if (!data.title && !data.message && !image) {
      if (post.message === '' && post.title === '') {
        toast.error('No changes made!');
        return;
      }
    }

    let url;
    if (image) {
      url = await uploadPhoto(image!);
      setValue('image', url);
    } else {
      url = post.image;
    }

    try {
      const updatedData = {
        ...data,
        title: data.title || post.title,
        message: data.message || post.message,
        image: url,
      };
      const updatedPost = await editPostAPI(post._id, accessToken, updatedData);
      setPosts(posts.map(p => (p._id === updatedPost._id ? updatedPost : p)));
      setShowEditForm(false);
      toast.success('Post updated successfully!');
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setValue('image', URL.createObjectURL(file));
  };

  const handleDeleteImage = () => {
    setImage(undefined);
    setValue('image', '');
    setPosts(posts.map(p => (p._id === post._id ? { ...post, image: '' } : p)));
    localStorage.setItem('posts', JSON.stringify(posts));
  };

  return (
    <Modal show={showEditForm} onHide={() => setShowEditForm(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>Edit the post image</Form.Label>
            <Card.Img
              variant="top"
              src={image ? URL.createObjectURL(image) : post.image}
            />
            <Form.Control type="file" onChange={handleImage} />
            {errors.image && <Form.Text>{errors.image.message}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Control
              type="text"
              {...register('title')}
              placeholder={post.title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="textarea">
            <Form.Control
              as="textarea"
              rows={10}
              {...register('message')}
              placeholder={post.message}
              style={{ height: '150px' }}
            />
            {errors.message && <Form.Text>{errors.message.message}</Form.Text>}
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditForm(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            <Button onClick={handleDeleteImage}>Delete Image</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
