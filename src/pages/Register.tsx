import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useRegister } from '../hooks/useRegister';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(16),
  password: z.string().min(8).max(16),
});

type FormFields = z.infer<typeof schema>;

export default function Register() {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { register: signup, isPending } = useRegister();

  const onSubmit: SubmitHandler<FormFields> = async data => {
    signup(data, {
      onError: () => {
        toast.error('User is already exist. Please try again.');
      },
      onSettled: () => {
        setValue('name', '');
        setValue('email', '');
        setValue('password', '');
      },
    });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col sm={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                {...register('name')}
                type="name"
                placeholder="Enter your full name"
              />
              {errors.name && <Form.Text>{errors.name.message}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                {...register('email')}
                type="email"
                placeholder="Enter email"
              />
              {errors.email && <Form.Text>{errors.email.message}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register('password')}
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <Form.Text>{errors.password.message}</Form.Text>
              )}
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit" disabled={isPending}>
                {isPending ? 'Loading...' : 'Submit'}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
