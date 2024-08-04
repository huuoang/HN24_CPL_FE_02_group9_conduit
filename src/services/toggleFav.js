import axios from "axios";

async function toggleFav({ slug, favorited, headers })
{


  try
  {
    const { data } = await axios({
      headers,
      method: favorited ? "DELETE" : "POST",
      url: `https://api.realworld.io/api/articles/${slug}/favorite`,
    });

    if (!data || !data.article)
    {
      throw new Error('Invalid response data');
    }

    return data.article;
  } catch (error)
  {
    throw error;
  }
}

export default toggleFav;

