import { Card, Dropdown } from "react-bootstrap";
import AddComment from "./AddComment";
// import { PostType } from "../helpers/types";

export default function Comments() {
  return (
    <Card>
      <Dropdown>
        <Dropdown.Toggle
          onClick={AddComment}
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
    </Card>
  );
}
