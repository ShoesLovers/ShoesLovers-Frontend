import { Col, Container, Form, Row } from 'react-bootstrap';
import { uploadPhoto } from '../api/auth_api';
import { UpdateUserAPI } from '../api/account_api';
import { User } from '../helpers/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTokens } from '../hooks/useTokens';
import { ChangeEvent, useState } from 'react';
import { saveToLocal } from '../helpers/saveToLocal';
import toast from 'react-hot-toast';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { MDBCardImage } from 'mdb-react-ui-kit';

import { FaRegEdit } from 'react-icons/fa';
import MySpinner from './MySpinner';

const schema = z.object({
  name: z.string().min(3).max(20).optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  password: z.string().min(8).max(16).optional().or(z.literal('')),
  image: z.string().optional().nullable(),
});
export type UpdateFormValues = z.infer<typeof schema>;

export default function UpdateUserForm({
  user,
  setUser,
}: {
  user: User;
  setUser: (user: User) => void;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(schema),
  });

  const [image, setImage] = useState<File>();
  const { accessToken, refreshToken } = useTokens();
  const onSubmit: SubmitHandler<UpdateFormValues> = async data => {
    if (!data.email && !data.name && !data.password && !image) {
      toast.error('No changes made!');
      return;
    }

    let url;
    if (image) {
      url = await uploadPhoto(image!);
      setValue('image', url);
    } else {
      url = user.image;
    }

    const updatedData = { ...data, image: url };
    try {
      const updatedUser = await UpdateUserAPI(
        user._id,
        accessToken,
        updatedData
      );
      setUser(updatedUser);
      saveToLocal(updatedUser, accessToken, refreshToken);

      toast.success('User updated successfully!');

      setValue('name', '');
      setValue('email', '');
      setValue('password', '');
      setValue('image', '');
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Image selected...');
    if (e.target?.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setValue('image', URL.createObjectURL(e.target.files[0]));
    }
  };
  if (isSubmitting) {
    return <MySpinner />;
  }

  return (
    <Container
      className="justify-content-center mt-3"
      style={{
        backgroundColor: '#F8F8FF',
        borderRadius: '20px',
      }}
    >
      <Row className="d-flex justify-content-center position-relative mt-3">
        <Col sm={8} md={8} lg={6}>
          <center>
            <Form style={{ width: '32rem' }} onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3 mt-5" controlId="formFile">
                <center>
                  <div className="d -flex justify-content-center position-relative mb-3">
                    <div>
                      <MDBCardImage
                        style={{ height: '360px', width: '300px' }}
                        src={image ? URL.createObjectURL(image) : user.image!}
                        alt="Avatar"
                        className="my-5 rounded img-thumbnail shadow-2-strong d-block  mx-auto  "
                        fluid
                      />
                    </div>
                  </div>
                </center>

                <Form.Control type="file" onChange={handleImage} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="name">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Edit name"
                  className="text-secondary"
                >
                  <Form.Control
                    type="text"
                    {...register('name')}
                    placeholder="Edit name"
                  />
                </FloatingLabel>
                {errors.name && <Form.Text>{errors.name.message}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Edit email"
                  className="text-secondary"
                >
                  <Form.Control
                    type="email"
                    placeholder="Edit email"
                    {...register('email')}
                  />
                </FloatingLabel>
                {errors.email && <Form.Text>{errors.email.message}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Edit password"
                  className="text-secondary"
                >
                  <Form.Control
                    type="password"
                    {...register('password')}
                    placeholder="Edit password"
                  />
                </FloatingLabel>
                {errors.password && (
                  <Form.Text>{errors.password.message}</Form.Text>
                )}
              </Form.Group>

              <div className="text-center">
                <button
                  type="submit"
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    marginBottom: '20px',
                  }}
                >
                  <FaRegEdit size="4rem" color="gray" />
                </button>
              </div>
            </Form>
          </center>
        </Col>
      </Row>
    </Container>
  );
}
