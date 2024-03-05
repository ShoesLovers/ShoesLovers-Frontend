import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

export default function ImageShape() {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image
            src="src/assets/images/default_image.jpg"
            roundedCircle
            style={{ width: '40px', height: '40px', marginLeft: '10px' }}
          />
        </Col>
      </Row>
    </Container>
  );
}
