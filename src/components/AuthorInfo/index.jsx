import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Avatar from "../Avatar";
import FollowButton from '../Buttons/FollowButton';
import Markdown from "markdown-to-jsx";
import getProfile from "../../services/getProfile";
import { useAuth } from "../../context/AuthContext";

function AuthorInfo() {
  const { state } = useLocation();
  const [author, setAuthor] = useState(state || {});
  const { headers, loggedUser } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!state || state.username !== username) {
      getProfile({ headers, username })
        .then(setAuthor)
        .catch((error) => {
          console.error(error);
          navigate("/not-found", { replace: true });
        });
    }
  }, [username, headers, state, navigate]);

  const followHandler = ({ followersCount, following }) => {
    setAuthor((prev) => ({
      ...prev,
      followersCount,
      following
    }));
  };

  return (
    <div className="col-xs-12 col-md-10 offset-md-1">
      <Avatar alt={username} className="user-img" src={author.image} />
      <h4>{username}</h4>

      {author.bio && <Markdown options={{ forceBlock: true }}>{author.bio}</Markdown>}

      {username === loggedUser.username ? (
        <Link
          className="btn btn-sm btn-outline-secondary action-btn"
          to="/settings"
        >
          <i className="ion-gear-a"></i> Edit Profile Settings
        </Link>
      ) : (
        <FollowButton
          followersCount={author.followersCount}
          following={author.following}
          handler={followHandler}
          username={username}
        />
      )}
    </div>
  );
}

export default AuthorInfo;
