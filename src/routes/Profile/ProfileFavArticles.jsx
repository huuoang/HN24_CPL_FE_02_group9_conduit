import ArticlesPagination from '../../components/Article/ArticlesPagination';
import ArticlesPreview from '../../components/Article/ArticlesPreview';
import useArticleList from "../../hooks/useArticles";
import { useParams } from "react-router-dom";

function ProfileFavArticles()
{
  const { username } = useParams();

  const { articles, articlesCount, loading, setArticlesData } = useArticleList({
    location: "favorites",
    username,
  });

  return loading ? (
    <div className="article-preview">
      <em>Loading {username} favorites articles...</em>
    </div>
  ) : articles.length > 0 ? (
    <>
      <ArticlesPreview
        articles={articles}
        loading={loading}
        updateArticles={setArticlesData}
      />

      <ArticlesPagination
        articlesCount={articlesCount}
        location="favorites"
        updateArticles={setArticlesData}
        username={username}
      />
    </>
  ) : (
    <div className="article-preview">{username} doesn't have favorites.</div>
  );
}

export default ProfileFavArticles;
