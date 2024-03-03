import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginAPI } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});
type loginProps = {
  setIsLoggedin: (value: boolean) => void;
};

type FormFields = z.infer<typeof schema>;

export default function Login({ setIsLoggedin }: loginProps) {
  const navigate = useNavigate();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      email: 'test@gmail.com',
    },
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: FormFields) =>
      LoginAPI({ email, password }),
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.account);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setIsLoggedin(true);
      toast.success(
        `Hello ${data.account.name}! You have successfully logged in 😄`
      );
      navigate('/myaccount');
    },
    onError: () => {
      toast.error('Invalid Email or Password, Please try again. 😢');
    },
    onSettled: () => {
      setValue('email', '');
      setValue('password', '');
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async data => {
    login(data);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col sm={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
