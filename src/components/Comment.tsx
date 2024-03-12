import { CommentType } from '../helpers/types';
export default function Comment({
  comment,
  setComments,
}: {
  comment: CommentType;
  setComments: (comments: CommentType[]) => void;
}) {
  return (
    <>
      <p>{comment.content}</p>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <p className="small mb-0 ">{comment.writer.name}</p>
        </div>
      </div>
    </>
  );
}
