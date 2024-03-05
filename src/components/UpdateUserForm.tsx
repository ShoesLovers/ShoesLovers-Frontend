import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { User } from "../api/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const schema = z.object({
  name: z.string().min(3).max(16),
  email: z.string().email(),
  password: z.string().min(8).max(16),
  image: z.string(),
});
export type FormValues = z.infer<typeof schema>;

export default function UpdateUserForm({
  user,
  setUser,
}: {
  user: User;
  setUser: (user: User) => void;
}) {
  const { register, getValues, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  console.log(getValues());
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
  };

  const { user: account } = user;

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col sm={8}>
          <h2>Edit your account</h2>
          <Form style={{ width: "32rem" }} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Profie Image</Form.Label>
              <Form.Control type="file" {...register("image")} />
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
        </Col>
      </Row>
    </Container>
  );
}
