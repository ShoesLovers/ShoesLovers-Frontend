import { useEffect } from 'react';
import { CommentType, PostType, User } from '../helpers/types';
import { getCommentsAPI } from '../api/comment_api';
import CommentForm from '../components/CommentForm';

export default function CommentList({
  isLoggedIn,
  user,
  setUser,
  posts,
  setPosts,
  comments,
  setComments,
}: {
  isLoggedIn: boolean;
  user: User;
  setUser: (user: User) => void;
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
}) {
  useEffect(() => {
    async function renderComments() {
      const commentsFromDb: CommentType[] = await getCommentsAPI();
      setComments(commentsFromDb);
    }
    renderComments();
  }, [setComments]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <CommentForm
            comments={comments}
            setComments={setComments}
            posts={posts}
            show={true}
            handleClose={() => {}}
            setPosts={setPosts}
            post={posts[0]}
          />
          <h1>Number or comments: {comments.length}</h1>
          {comments.map(comment => (
            // <Comment
            //   user={user}
            //   setUser={setUser}
            //   key={comment._id}
            //   comment={comment}
            //   setComments={setComments}
            //   comments={comments}
            // />
            <h5 key={comment._id}>{comment.content}</h5>
          ))}
        </>
      ) : (
        <h1>Login to see the comments</h1>
      )}
    </div>
  );
}
