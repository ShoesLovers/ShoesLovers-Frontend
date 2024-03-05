import { Button, Form } from 'react-bootstrap';

export default function PostForm() {
  return (
    <center>
      <div style={{ backgroundColor: '' }}>
        <Form style={{ width: '32rem' }}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              as="textarea"
              placeholder="Enter Text"
              style={{ height: '150px' }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </center>
  );
}
