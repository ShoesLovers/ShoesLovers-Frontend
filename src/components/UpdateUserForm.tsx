import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { UpdateUserAPI, uploadPhoto } from '../api/auth'
import { User } from '../helpers/types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTokens } from '../hooks/useTokens'
import { ChangeEvent, useState } from 'react'

const schema = z.object({
  name: z.string().min(3).max(16).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(16).optional(),
  image: z.string().optional(),
})
export type UpdateFormValues = z.infer<typeof schema>

export default function UpdateUserForm({
  user,
  setUser,
}: {
  user: User
  setUser: (user: User) => void
}) {
  const {
    getValues,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(schema),
  })

  const [image, setImage] = useState<File>()
  const { accessToken } = useTokens()
  const onSubmit: SubmitHandler<UpdateFormValues> = async data => {
    const url = await uploadPhoto(image!)
    setValue('image', url)
    const updatedData = { ...data, image: url }
    const updatedUser = await UpdateUserAPI(user._id, accessToken, updatedData)
    console.log(updatedUser)
    setUser(updatedUser)
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Image selected...')
    if (e.target?.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
      setValue('image', URL.createObjectURL(e.target.files[0]))
    }
    console.log(getValues())
    console.log(getValues('image'))
  }
  console.log(user)
  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col sm={8}>
          <Form style={{ width: '32rem' }} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formFile">
              <center>
                <div className="d -flex justify-content-center position-relative">
                  <div style={{ height: '230px', width: '230px' }}>
                    <Image
                      src={image ? URL.createObjectURL(image) : user.image!}
                      roundedCircle
                      className="img-fluid"
                    />
                  </div>
                </div>
              </center>

              <Form.Label>Upload Profie Image</Form.Label>
              <Form.Control type="file" onChange={handleImage} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Edit name</Form.Label>
              <Form.Control
                type="text"
                {...register('name')}
                placeholder={user.name}
              />
              {errors.name && <Form.Text>{errors.name.message}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Edit email </Form.Label>
              <Form.Control
                type="email"
                {...register('email')}
                placeholder={user.email}
              />
              {errors.email && <Form.Text>{errors.email.message}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Edit password</Form.Label>
              <Form.Control type="text" {...register('password')} />
              {errors.password && (
                <Form.Text>{errors.password.message}</Form.Text>
              )}
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Update
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
