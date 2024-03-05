import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { UpdateUserAPI, User } from "../api/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export interface Image extends FileList {
  0: File;
  length: number;
}

const schema = z.object({
  name: z.string().min(3).max(16),
  email: z.string().email(),
  password: z.string().min(8).max(16),
});
export type UpdateFormValues = z.infer<typeof schema>;

export default function UpdateUserForm({
  user,
  setUser,
}: {
  user: User;
  setUser: (user: User) => void;
}) {
  const { register, getValues, handleSubmit } = useForm<UpdateFormValues>({
    resolver: zodResolver(schema),
  });

  const { user: account } = user;
  const id = account._id;
  const accessToken = user.accessToken;
  const onSubmit: SubmitHandler<UpdateFormValues> = async (data) => {
    const response = await UpdateUserAPI(id, accessToken, data);
    setUser({ ...user, user: response });
    console.log(response);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col sm={8}>
          <h2>Edit your account</h2>
          <Form style={{ width: "32rem" }} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Upload Profie Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Edit name ({account.name})</Form.Label>
              <Form.Control type="text" {...register("name")} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Edit email ({account.email}) </Form.Label>
              <Form.Control type="email" {...register("email")} />
              {getValues("email")}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" {...register("password")} />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Update
              </Button>
            </div>
          </Form>
          <button onClick={() => console.log(getValues("image"))}></button>
        </Col>
      </Row>
    </Container>
  );
}
