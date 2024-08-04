import axios from "axios";

async function setArticle({ body, description, headers, slug, tagList, title })
{

  try
  {
    const { data } = await axios({
      data: { article: { title, description, body, tagList } },
      headers,
      method: slug ? "PUT" : "POST",
      url: slug ? `https://api.realworld.io/api/articles/${slug}` : "https://api.realworld.io/api/articles",
    });

    if (!data || !data.article || !data.article.slug)
    {
      throw new Error('Invalid response data: article or article.slug is missing');
    }

    return data.article.slug;
  } catch (error)
  {
    throw error;
  }
}

export default setArticle;

