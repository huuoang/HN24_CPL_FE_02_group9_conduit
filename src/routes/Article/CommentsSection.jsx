import CommentEditor from "../../components/CommentEditor";
import CommentList from "../../components/CommentList/CommentList";
import { useParams } from "react-router-dom";
import { useComments } from "../../hooks/userComments";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function CommentsSection() {
  const { slug } = useParams();
  const { headers, isAuth } = useAuth(); // lấy isAuth từ useAuth
  const { comments, addComment, removeComment } = useComments(slug);

  const handleAddComment = (newCommentBody) => {
    return addComment(newCommentBody, headers)
      .catch(console.error);
  };

  const handleDeleteComment = (commentId) => {
    return removeComment(commentId, headers)
      .catch(console.error);
  };

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        {isAuth ? (
          <>
            <CommentEditor onAddComment={handleAddComment} />
            <CommentList 
              comments={comments} 
              onDeleteComment={handleDeleteComment}
            />
          </>
        ) : (
          <div>
            <span>
              <Link to="/login">Sign in</Link> or <Link to="/register">Sign up</Link> to
              add comments on this article.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentsSection;
