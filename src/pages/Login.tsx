import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Form, Button, CardTitle, Container } from 'react-bootstrap';
import { useLogin } from '../hooks/useLogin';
import LoginWithGoogle from '../components/LoginWithGoogle';
import { User } from '../helpers/types';
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import MySpinner from '../components/MySpinner';
import { useState } from 'react';
import { MDBRow, MDBCol, MDBContainer } from 'mdb-react-ui-kit';
import '../style/login.css';

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

  const [isLoading, setIsLoading] = useState(false);
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

  if (isPending || isLoading) {
    return <MySpinner />;
  }

  return (
    <Container style={{ backgroundColor: '', marginTop: '20px' }}>
      {!isLoggedIn ? (
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol sm="6">
              <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4 mt-3">
                <span
                  className="h1 fw-bold mb-0"
                  style={{
                    marginLeft: '50px',
                    letterSpacing: '1px',
                    color: ' #d63434',
                  }}
                >
                  Shoes Lovers
                </span>
                <Form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                  <Form.Group
                    style={{ width: '100%' }}
                    className="mb-4 mx-5 w-100"
                    controlId="formEmail"
                  >
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email address"
                      className="text-secondary"
                    >
                      <Form.Control
                        {...register('email')}
                        type="email"
                        className="email_span"
                        placeholder="test@gmail.com"
                      />
                    </FloatingLabel>

                    {errors.email && (
                      <Form.Text>{errors.email.message}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group
                    className="mb-4 mx-5 w-100"
                    controlId="formPassword"
                  >
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Password"
                      className="text-secondary password_span"
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

                  <div className=" ">
                    <Button
                      size="lg"
                      variant="outline-success"
                      type="submit"
                      disabled={isPending}
                      className="mb-4 px-5 mx-5 w-100 "
                      color="info"
                    >
                      {isPending ? 'Loading...' : 'Log In'}
                    </Button>

                    <h5
                      className="text-center w-100 "
                      style={{ marginLeft: '40px' }}
                    >
                      Or
                    </h5>

                    <div
                      className="text-center mt-3 mb-5 pb-lg-3 ms-5 w-100"
                      style={{
                        width: '100%',
                      }}
                    >
                      <center>
                        <LoginWithGoogle
                          setIsLoading={setIsLoading}
                          setUser={setUser}
                          setIsLoggedIn={setIsLoggedIn}
                        />
                      </center>
                    </div>
                  </div>
                </Form>
              </div>
            </MDBCol>
            <MDBCol sm="6" className="d-none d-sm-block px-0">
              <img
                src="https://node29.cs.colman.ac.il/public/pic.png"
                alt="Login image"
                className="w-100"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'left',
                  marginTop: '20%',
                }}
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
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
    </Container>
  );
}
