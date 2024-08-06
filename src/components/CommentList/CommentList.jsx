import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import dateFormatter from "../../helpers/dateFormatter";
import CommentAuthor from "./CommentAuthor";

function CommentList({ comments, onDeleteComment }) {
  const { isAuth, loggedUser } = useAuth();
  const navigate = useNavigate();

  const handleDelete = (commentId) => {
    if (!isAuth) navigate('/login');

    const confirmation = window.confirm("Want to delete the comment?");
    if (!confirmation) return;

    onDeleteComment(commentId);
  };

  return comments?.length > 0 ? (
    comments.map(({ author, body, createdAt, id }) => (
      <div className="card" key={id}>
        <div className="card-block">
          <p className="card-text">{body}</p>
        </div>
        <div className="card-footer">
          <CommentAuthor {...author} />
          <span className="date-posted">{dateFormatter(createdAt)}</span>
          {isAuth && loggedUser.username === author.username && (
            <button
              className="btn btn-sm btn-outline-secondary pull-xs-right"
              onClick={() => handleDelete(id)}
            >
              <i className="ion-trash-a"></i>
            </button>
          )}
        </div>
      </div>
    ))
  ) : (
    <div>There are no comments yet...</div>
  );
}

export default CommentList;
