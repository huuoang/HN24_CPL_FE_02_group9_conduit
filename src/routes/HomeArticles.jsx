import ArticlesPagination from '../components/Article/ArticlesPagination';
import ArticlesPreview from '../components/Article/ArticlesPreview';
import useArticles from '../hooks/useArticles';
import { useFeedContext } from '../context/FeedContext';

function HomeArticles() {
  const { tabName, tagName } = useFeedContext();

  const { articles, articlesCount, loading, setArticlesData } = useArticles({
    location: tabName,
    tabName,
    tagName,
  });

  return loading ? (
    <div className="article-preview">
      <em>Loading articles list...</em>
    </div>
  ) : articles.length > 0 ? (
    <>
      <ArticlesPreview articles={articles} loading={loading} updateArticles={setArticlesData} />
      <ArticlesPagination
        articlesCount={articlesCount}
        location={tabName}
        tagName={tagName}
        updateArticles={setArticlesData}
      />
    </>
  ) : (
    <div className="article-preview">Articles not available.</div>
  );
}

export default HomeArticles;
