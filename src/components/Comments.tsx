import { useState } from "react";
import { Card, Dropdown } from "react-bootstrap";
// import { PostType } from "../helpers/types";
import { Modal, Button, Form } from "react-bootstrap";
export default function Comments() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Card>
      <Dropdown>
        <Dropdown.Toggle
          onClick={handleShow}
          style={{ width: "30rem" }}
          variant="success"
          id="dropdown-basic"
        >
          Comments
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {/* {PostType.comments?.map((comment, index) => ( */}
          {/* <Dropdown.Item key={index}>{comment}</Dropdown.Item> */}
          {/* ))} */}
        </Dropdown.Menu>
      </Dropdown>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
