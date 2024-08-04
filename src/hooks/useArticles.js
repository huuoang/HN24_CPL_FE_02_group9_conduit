import { useEffect, useState } from 'react';
import getArticles from '../services/getArticles';
import { useAuth } from '../context/AuthContext';

function useArticles({ location, tabName, tagName, username }) {
  const [{ articles, articlesCount }, setArticlesData] = useState({
    articles: [],
    articlesCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const { headers } = useAuth();

  useEffect(() => {
    if (!headers && tabName === 'feed') return;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await getArticles({ headers, location, tagName, username });
        setArticlesData({
          articles: data.articles || [],
          articlesCount: data.articlesCount || 0,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [headers, location, tabName, tagName, username]);

  return { articles, articlesCount, loading, setArticlesData };
}

export default useArticles;
