import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { UpdateUserAPI } from "../api/auth";
import { User } from "../helpers/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTokens } from "../hooks/useTokens";
import { saveToLocal } from "../helpers/saveToLocal";
import { ChangeEvent } from "react";

const schema = z.object({
  name: z.string().min(3).max(16).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(16).optional(),
  image: z.string().optional(),
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
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(schema),
  });

  const { _id: id } = user;
  const { accessToken, refreshToken } = useTokens();

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files as FileList;
    const image = `src/assets/images/${selectedImage[0]?.name}`;
    setValue("image", image);
    setUser({ ...user, image });
  };

  const onSubmit: SubmitHandler<UpdateFormValues> = async (data) => {
    const updatedUser: User = await UpdateUserAPI(id, accessToken, data);
    setUser(updatedUser);
    saveToLocal(updatedUser, accessToken, refreshToken);
  };
  console.log(getValues());
  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col sm={8}>
          <h2>Edit your account</h2>
          <Form style={{ width: "32rem" }} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Upload Profie Image</Form.Label>
              <Form.Control type="file" onChange={handleImage} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Edit name</Form.Label>
              <Form.Control
                type="text"
                {...register("name")}
                placeholder={user.name}
              />
              {errors.name && <Form.Text>{errors.name.message}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Edit email </Form.Label>
              <Form.Control
                type="email"
                {...register("email")}
                placeholder={user.email}
              />
              {errors.email && <Form.Text>{errors.email.message}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" {...register("password")} />
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
  );
}
