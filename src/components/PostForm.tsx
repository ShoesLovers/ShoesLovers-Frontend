import { Button, Form } from "react-bootstrap";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostType, User } from "../helpers/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent } from "react";
import { useTokens } from "../hooks/useTokens";
import { createPostAPI } from "../api/auth";

const schema = z.object({
  image: z.string().optional(),
  message: z.string().min(1).max(255),
  title: z.string().min(1).max(255),
});
export type PostFormValues = z.infer<typeof schema>;

export default function PostForm({
  posts,
  setPosts,
}: {
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(schema),
  });
  const { accessToken } = useTokens();

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };
  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    const newPost: PostType = await createPostAPI(accessToken, data);
    const user: User = JSON.parse(localStorage.getItem("user")!);
    console.log(user._id);
    console.log(newPost.owner);
    setPosts([...posts, newPost]);
    console.log(posts);
  };
  return (
    <center>
      <div style={{ backgroundColor: "" }}>
        <Form style={{ width: "32rem" }} onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" onChange={handleImage} />
            {errors.image && <Form.Text>{errors.image.message}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Label>Upload Profie Image</Form.Label>
            <Form.Control type="text" {...register("title")} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="textarea">
            <Form.Control
              type="textarea"
              {...register("message")}
              placeholder="Write your message here"
              style={{ height: "150px" }}
            />
            {errors.message && <Form.Text>{errors.message.message}</Form.Text>}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </center>
  );
}
