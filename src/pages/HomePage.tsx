import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { generateImageAPI } from '../api/auth';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Image,
  Row,
} from 'react-bootstrap';
import toast from 'react-hot-toast';
import defaultImage from '../assets/images/default.jpg';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function HomePage() {
  const [shoesImage, setShoesImage] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');

  const { mutate: generate, isPending } = useMutation({
    mutationFn: (prompt: string) => generateImageAPI(prompt),
    onSuccess: async data => {
      if (data.length > 0 && data[0].url) {
        setShoesImage(data[0].url);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt === '') return;
    if (!prompt.toLowerCase().includes('shoes')) {
      toast.error('Please include the word "shoes" in the prompt');
      return;
    }

    generate(prompt, {
      onSettled: () => {
        setPrompt('');
      },
    });
    e.preventDefault();
  };
  return (
    <Container
      style={{
        backgroundColor: '#EEEEEE',
        borderRadius: '20px',
      }}
    >
      <Row className="justify-content-center mt-5 text-center">
        <Col sm={8} md={6} lg={6}>
          <div>
            <Image
              src={shoesImage ? shoesImage : defaultImage}
              style={{ height: '270px', width: '270px', marginTop: '40px' }}
              rounded
            />
          </div>
          <Form className="mt-5" onSubmit={e => handleSubmit(e)}>
            <FormGroup
              controlId="formInput"
              style={{
                marginBottom: '1.5rem',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              <FloatingLabel
                controlId="floatingInput"
                label="Include 'shoes' in the request..."
                className="text-secondary"
              >
                <FormControl
                  style={{
                    fontSize: '20px',
                  }}
                  type="text"
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="Include 'shoes' in the request..."
                />
              </FloatingLabel>
            </FormGroup>

            <FormGroup>
              <Button
                type="submit"
                variant="outline-dark"
                size="lg"
                disabled={isPending}
                style={{
                  marginBottom: '30px',
                }}
              >
                Generate
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
