import { useEffect } from 'react';
import { CommentType, PostType } from '../helpers/types';
import { getCommentsAPI } from '../api/comment_api';
import CommentForm from '../components/CommentForm';
import { getPost, getPostById } from '../api/post_api';

export default function CommentList({
  comments,
  setComments,
  handleCommentsClose,
  post,
}: {
  post: PostType;
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
  handleCommentsClose: () => void;
}) {
  return (
    <div>
      <>
        <h1>Number or comments: {comments.length}</h1>
        {comments.map(
          comment => (
            console.log(comment), (<h5 key={comment._id}>{comment.content}</h5>)
          )
        )}
      </>
    </div>
  );
}
