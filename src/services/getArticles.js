import axios from "axios";
import errorHandler from "../helpers/errorHandler";

// prettier-ignore
async function getArticles({
  headers,
  limit = 10,
  location,
  page = 0,
  tagName,
  username,
})
{
  try
  {
    const url = {
      favorites: `https://api.realworld.io/api/articles?favorited=${username}&&limit=${limit}&&offset=${page}`,
      feed: `https://api.realworld.io/api/articles/feed?limit=${limit}&&offset=${page}`,
      global: `https://api.realworld.io/api/articles?limit=${limit}&&offset=${page}`,
      profile: `https://api.realworld.io/api/articles?author=${username}&&limit=${limit}&&offset=${page}`,
      tag: `https://api.realworld.io/api/articles?tag=${tagName}&&limit=${limit}&&offset=${page}`,
    };

    const { data } = await axios({ url: url[ location ], headers });

    return data;
  } catch (error)
  {
    errorHandler(error);
  }
}

export default getArticles;

