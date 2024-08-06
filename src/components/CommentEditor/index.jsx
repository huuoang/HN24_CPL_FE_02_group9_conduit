import { useState } from 'react';
import Avatar from "../Avatar";
import { useAuth } from '../../context/AuthContext'; 

function CommentEditor({ onAddComment }) {
  const [body, setBody] = useState('');
  const { loggedUser } = useAuth(); 
  const { username, image } = loggedUser || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body.trim()) {
      onAddComment(body)
        .then(() => setBody(''))
        .catch(console.error);
    }
  };

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="3"
          placeholder="Write a comment..."
          required
        />
      </div>
      <div className="card-footer">
        <Avatar alt={username} className="comment-author-img" src={image} />
        <button className="btn btn-sm btn-primary" type="submit">Post Comment</button>
      </div>
    </form>
  );
}

export default CommentEditor;
