import { Link } from "react-router-dom";
import dateFormatter from "../../helpers/dateFormatter";
import Avatar from "../Avatar";

function ArticleMeta({ author,children,createdAt }) 
{
    const {bio,followersCount,image,username} = author || {};
    return(
        <div className="article-meta">
            <link 
                state= {{bio,followersCount,image,username}}
                to={`/profile/${username}`}
            >
                <Avatar alt={username}  src={image}></Avatar>
            </link>

            <div className="info">
                <Link 
                    className="author"
                    state={{bio,followersCount,image,username}}
                    to={`/profile/${username}`}
                >
                    {username}
                </Link>
                <span className="date">{dateFormatter(createdAt)}</span>
            </div>
            {children}
        </div>
    )
}

export default ArticleMeta