import { CommentType } from '../helpers/types';
import { User } from '../helpers/types';
import ImageShape from './ImageShape';
export default function Comment({
  comment,

  user,
}: {
  comment: CommentType;

  user: User;
}) {
  return (
    <>
      <div className="row d-flex justify-content">
        <div className="col-md-8 col-lg-6">
          <center>
            <div
              className="card shadow-0 border"
              style={{
                backgroundColor: '#f0f2f5',
                width: '29rem',
              }}
            >
              <div className="card-body p-8">
                <div className="card mb-4">
                  <div className="d-flex flex-row align-items-center">
                    <div style={{ fontSize: '15px' }}>
                      {comment.writer.name}
                      <p>
                        <ImageShape user={user} />
                      </p>
                    </div>
                    <div className="card-body">
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
    </>
  );
}
