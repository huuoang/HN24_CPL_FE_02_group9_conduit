import toggleFav from '../../../services/toggleFav';
import { useAuth } from '../../../context/AuthContext';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
function FavButton({ favorited, favoritesCount, handler, right, slug, text })
{
  const [ loading, setLoading ] = useState(false);
  const { headers, isAuth } = useAuth();

  const buttonPosition = right ? "pull-xs-right" : "";
  const buttonStyle = favorited ? "active" : "";
  const buttonText = text ? "Favorite" : !isAuth ? "" : "";
  const navigate=useNavigate();
  const handleClick = () =>
  {
    if (!isAuth) return navigate("/login");

    setLoading(true);

    toggleFav({ slug, favorited, headers })
      .then(handler)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <button
      className={`btn btn-sm btn-outline-primary ${buttonPosition} ${buttonStyle}`}
      disabled={loading}
      onClick={handleClick}
    >
      <i className="ion-heart"></i> {buttonText}
      <span className="counter">  {favoritesCount} </span>
    </button>
  );
}

export default FavButton;
