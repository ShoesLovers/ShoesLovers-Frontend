import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <Alert variant="danger">
        Oops! The Page You are looking for is not available 😞
      </Alert>
      <Link to="/" className="text-decoration-none .text-info">
        Go to Home Page from this Link.
      </Link>
    </div>
  );
}
