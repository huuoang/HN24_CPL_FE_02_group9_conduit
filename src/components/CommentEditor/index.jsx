import Avatar from "../Avatar";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

function CommentEditor({ onAddComment }) {
  const [body, setBody] = useState("");
  const { isAuth, loggedUser } = useAuth();
  const { username, image } = loggedUser || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (body.trim() === "") return;

    onAddComment(body)
      .then(() => {
        setBody("");
      })
      .catch(console.error);
  };

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  return isAuth ? (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          className="form-control"
          onChange={handleChange}
          placeholder="Write a comment..."
          rows="3"
          value={body}
        ></textarea>
      </div>

      <div className="card-footer">
        <Avatar alt={username} className="comment-author-img" src={image} />
        <button className="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  ) : null; // Không hiển thị gì nếu chưa đăng nhập
}

export default CommentEditor;
