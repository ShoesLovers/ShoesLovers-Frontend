import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { User } from '../api/auth';

export default function UpdateUserForm({
  user,
  setUser,
}: {
  user: User;
  setUser: (user: User) => void;
}) {
  // function handleSubmit() {} TODO: implement handleSubmit

  const { user: account } = user;
  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col sm={8}>
          <h2>Edit your account</h2>
          <Form style={{ width: '32rem' }}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Profie Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Edit name ({account.name})</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Edit email ({account.email}) </Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" />
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
