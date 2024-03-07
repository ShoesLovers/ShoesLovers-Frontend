import { SubmitHandler, set, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Col, Container, Row, Form, Button, Image } from 'react-bootstrap'
import { useRegister } from '../hooks/useRegister'
import { User } from '../helpers/types'
import avatar from '../assets/images/default.jpg'
import { useState } from 'react'

const schema = z.object({
  image: z.string().url(),
  email: z.string().email(),
  name: z.string().min(3).max(16),
  password: z.string().min(8).max(16),
})

export type RegisterFormFields = z.infer<typeof schema>

export default function Register({
  setUser,
  setIsLoggedIn,
}: {
  setUser: (user: User) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
}) {
  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(schema),
  })

  const { register: signup, isPending } = useRegister(setUser, setIsLoggedIn)
  const [image, setImage] = useState<string>()

  const onSubmit: SubmitHandler<RegisterFormFields> = async data => {
    signup(data, {
      onError: () => {
        toast.error('User is already exist. Please try again.')
        setValue('name', '')
        setValue('email', '')
        setValue('password', '')
      },
    })
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Image selected...')
    if (e.target?.files && e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]))
      setValue('image', URL.createObjectURL(e.target.files[0]), {
        shouldValidate: true,
      })
    }
    console.log(getValues('image'))
  }

  return (
    <Container className="justify-content-center mt-3">
      <Row className="d-flex justify-content-center position-relative mt-3">
        <Col sm={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formFile">
              <center>
                <div className="d -flex justify-content-center position-relative">
                  <div style={{ height: '230px', width: '230px' }}>
                    <Image
                      src={image ? image : avatar}
                      roundedCircle
                      className="img-fluid"
                    />
                  </div>
                </div>
              </center>

              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" onChange={handleImage} />
            </Form.Group>

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
  )
}
