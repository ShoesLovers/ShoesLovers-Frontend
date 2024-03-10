import { Button, Form, Image } from 'react-bootstrap';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostType, User } from '../helpers/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { useTokens } from '../hooks/useTokens';
import { createPostAPI, uploadPhoto } from '../api/auth';

const schema = z.object({
  image: z.string().optional(),
  message: z.string().min(1).max(255),
  title: z.string().min(1).max(255),
});
export type PostFormValues = z.infer<typeof schema>;

export default function PostForm({
  posts,
  setPosts,
  setUser,
  user,
}: {
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
  user: User;
  setUser: (user: User) => void;
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
    let newPost;
    // const user: User = JSON.parse(localStorage.getItem('user')!);

    if (image) {
      const url = await uploadPhoto(image);
      newPost = await createPostAPI(accessToken, { ...data, image: url });
    } else {
      newPost = await createPostAPI(accessToken, data);
    }

    const currentPosts = [...posts, newPost];
    setPosts([...posts, newPost]);
    const updatedUser: User = { ...user, posts: [...user.posts!, newPost] };
    setUser(updatedUser);
  };

  return (
    <center>
      <div style={{ backgroundColor: '' }}>
        <Form style={{ width: '32rem' }} onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>Default file input example</Form.Label>
            <Image src={image ? URL.createObjectURL(image) : ''} />
            <Form.Control type="file" onChange={handleImage} />
            {errors.image && <Form.Text>{errors.image.message}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Label>Upload Profie Image</Form.Label>
            <Form.Control type="text" {...register('title')} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="textarea">
            <Form.Control
              type="textarea"
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
