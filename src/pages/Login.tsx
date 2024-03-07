import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Col, Container, Row, Form, Button, CardTitle } from 'react-bootstrap'
import { useLogin } from '../hooks/useLogin'
import LoginWithGoogle from '../components/LoginWithGoogle'
import { User } from '../helpers/types'
import { Link } from 'react-router-dom'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
})

export type LoginFormFields = z.infer<typeof schema>

export default function Login({
  setUser,
  isLoggedIn,
  setIsLoggedIn,
}: {
  setUser: (user: User) => void
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    defaultValues: {
      email: 'test@gmail.com',
    },
    resolver: zodResolver(schema),
  })

  const { login, isPending } = useLogin(setUser, setIsLoggedIn)

  const onSubmit: SubmitHandler<LoginFormFields> = async data => {
    login(data, {
      onError: () => {
        toast.error('Invalid Email or Password, Please try again. 😢')
        setValue('password', '')
        setValue('email', '')
      },
    })
  }

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col sm={8}>
          {!isLoggedIn ? (
            <>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    {...register('email')}
                    type="email"
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <Form.Text>{errors.email.message}</Form.Text>
                  )}
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

              <div className="text-center mt-3">
                <LoginWithGoogle
                  setUser={setUser}
                  setIsLoggedIn={setIsLoggedIn}
                />
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
  )
}
