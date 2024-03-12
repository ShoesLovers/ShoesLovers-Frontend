import { Button, Card, Form } from 'react-bootstrap';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostType } from '../helpers/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { useTokens } from '../hooks/useTokens';
import { uploadPhoto } from '../api/auth_api';
import { createPostAPI } from '../api/post_api';

const schema = z.object({
  image: z.string().optional(),
  message: z.string().min(1).max(255),
  title: z.string().min(1).max(255),
});

export type PostFormValues = z.infer<typeof schema>;

export default function PostForm({
  setPosts,
  posts,
}: {
  setPosts: (posts: PostType[]) => void;
  posts: PostType[];
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
    let url;
    if (image) {
      url = await uploadPhoto(image);
    }
    setValue('image', url);
    const newData = { ...data, image: url };
    const newPost = await createPostAPI(accessToken, newData);

    localStorage.setItem('posts', JSON.stringify([newPost, ...posts]));
    setPosts([newPost, ...posts]);
  };

  return (
    <center>
      <div style={{ backgroundColor: '' }}>
        <Form style={{ width: '25rem' }} onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formFile">
            <Card
              style={{
                marginBottom: '40px',
              }}
            >
              <Card.Img
                variant="top"
                src={image ? URL.createObjectURL(image) : ''}
              />
            </Card>

            <Form.Control type="file" onChange={handleImage} />
            {errors.image && <Form.Text>{errors.image.message}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Label>Enter the post title</Form.Label>
            <Form.Control type="text" {...register('title')} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="textarea">
            <Form.Control
              as="textarea"
              rows={10}
              {...register('message')}
              placeholder="Write your message here"
              style={{ height: '150px' }}
            />
            {errors.message && <Form.Text>{errors.message.message}</Form.Text>}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </center>
  );
}
