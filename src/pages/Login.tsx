import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Col, Container, Row, Form, Button, CardTitle } from 'react-bootstrap';
import { useLogin } from '../hooks/useLogin';
import LoginWithGoogle from '../components/LoginWithGoogle';
import { User } from '../helpers/types';
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import MySpinner from '../components/MySpinner';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export type LoginFormFields = z.infer<typeof schema>;

export default function Login({
  setUser,
  isLoggedIn,
  setIsLoggedIn,
}: {
  setUser: (user: User) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(schema),
  });

  const { login, isPending } = useLogin(setUser, setIsLoggedIn);

  const onSubmit: SubmitHandler<LoginFormFields> = async data => {
    login(data, {
      onError: () => {
        toast.error('Invalid Email or Password, Please try again. 😢');
        setValue('password', '');
        setValue('email', '');
      },
    });
  };

  if (isPending) {
    return <MySpinner />;
  }

  return (
    <Container
      style={{
        backgroundColor: '#EEEEEE',
        borderRadius: '20px',
      }}
    >
      <Row className="justify-content-center mt-3">
        <Col sm={8} md={6} lg={4}>
          {!isLoggedIn ? (
            <>
              <Form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                <Form.Group className="mb-3" controlId="formEmail">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="text-secondary"
                  >
                    <Form.Control
                      {...register('email')}
                      type="email"
                      placeholder="test@gmail.com"
                    />
                  </FloatingLabel>

                  {errors.email && (
                    <Form.Text>{errors.email.message}</Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Password"
                    className="text-secondary"
                  >
                    <Form.Control
                      {...register('password')}
                      type="password"
                      placeholder="Password"
                    />
                  </FloatingLabel>
                  {errors.password && (
                    <Form.Text>{errors.password.message}</Form.Text>
                  )}
                </Form.Group>

                <div className="text-center mt-4 mb-5">
                  <Button
                    size="lg"
                    variant="outline-success"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? 'Loading...' : 'Submit'}
                  </Button>
                </div>
              </Form>

              <div
                className="text-center mt-3 mb-5"
                style={{
                  width: '100%',
                }}
              >
                <center>
                  <LoginWithGoogle
                    setUser={setUser}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                </center>
              </div>
            </>
          ) : (
            <>
              <CardTitle className="text-center">
                You are already logged in!
              </CardTitle>
              <center>
                <Link
                  to={'/myaccount'}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                ></Link>
              </center>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
