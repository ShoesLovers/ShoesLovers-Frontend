import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import avatar from '../assets/images/default.jpg';
import { User } from '../helpers/types';

export default function ImageShape({ user }: { user: User }) {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image
            src={user.image || avatar}
            roundedCircle
            style={{ width: '50px', height: '50px', marginLeft: '10px' }}
          />
        </Col>
      </Row>
    </Container>
  );
}
