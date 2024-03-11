import { Spinner } from 'react-bootstrap';

export default function MySpinner() {
  return (
    <center>
      <Spinner
        animation="border"
        role="status"
        variant="secondary"
        style={{
          marginTop: '20%',
          width: '100px',
          height: '100px',
        }}
      />
    </center>
  );
}
