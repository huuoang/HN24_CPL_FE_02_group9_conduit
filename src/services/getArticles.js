import axios from 'axios';

// prettier-ignore
async function getArticles({ headers, limit = 10, location, offset = 0, tagName, username }) {
  try {
    const url = {
      favorites: `https://api.realworld.io/api/articles?favorited=${username}&limit=${limit}&offset=${offset}`,
      feed: `https://api.realworld.io/api/articles/feed?limit=${limit}&offset=${offset}`,
      global: `https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}`,
      profile: `https://api.realworld.io/api/articles?author=${username}&limit=${limit}&offset=${offset}`,
      tag: `https://api.realworld.io/api/articles?tag=${tagName}&limit=${limit}&offset=${offset}`,
    };

    const { data } = await axios({ url: url[location], headers });

    return data;
  } catch (error) {
    
  }
}

export default getArticles;
