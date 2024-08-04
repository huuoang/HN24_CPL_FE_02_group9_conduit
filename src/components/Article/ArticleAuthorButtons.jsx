import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import deleteArticle from "../../services/deleteArticle";

function ArticleAuthorButtons({ body, description, slug, tagList, title }) {
  const { headers, isAuth, loggedUser } = useAuth();
  const navigate = useNavigate();

  const username = loggedUser.username;

  const handleClick = () => {
    if (!isAuth) return navigate("/login", { replace: true });

    const confirmation = window.confirm("Want to delete the article?");
    if (!confirmation) return;

    deleteArticle({ headers, slug })
      .then(() => {
        if (username) {
          navigate(`/profile/${username}`);
        } else {
          console.error("Username is not defined");
        }
      })
      .catch(console.error);
  };

  return (
    <>
      <button
        className="btn btn-sm"
        style={{ color: "#d00" }}
        onClick={handleClick}
      >
        <i className="ion-trash-a"></i> Delete Article
      </button>{" "}
      <button className="btn btn-sm" style={{ color: "#777" }}>
        <Link
          className="nav-link"
          state={{ body, description, tagList, title }}
          to={`/editor/${slug}`}
        >
          <i className="ion-edit"></i> Edit Article
        </Link>
      </button>{" "}
    </>
  );
}

export default ArticleAuthorButtons;
