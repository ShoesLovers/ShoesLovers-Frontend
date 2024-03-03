import { Card, Button } from 'react-bootstrap';

export default function Post() {
  return (
    <center className="mt-3 mb-3">
      <Card style={{ width: '32rem' }}>
        <Card.Img
          variant="top"
          src="src\assets\images\Labrador_Retriever_portrait.jpg"
        />
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Button variant="primary">Add Comment</Button>
          <Button variant="outline-info"> Comments</Button>
        </Card.Body>
        <Card.Body>
          <Button variant="secondary"> Edit Post</Button>
          <Button variant="info"> Delete Post</Button>
          <Card.Text className="mt-3">Comments:5</Card.Text>
        </Card.Body>
      </Card>
    </center>
  );
}
