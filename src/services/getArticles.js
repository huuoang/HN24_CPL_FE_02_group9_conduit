import axios from "axios";

export default async function getArticle({ headers, slug })
{
  try
  {
    const response = await axios.get(`https://api.realworld.io/api/articles/${slug}`, { headers });
    const data = response.data;
    if (data && data.article)
    {
      return data.article;
    } else
    {
      throw new Error("Failed to fetch article");
    }
  } catch (error)
  {
    console.error(error);
    throw error;
  }
}


