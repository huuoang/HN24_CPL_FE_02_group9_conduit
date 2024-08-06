import axios from "axios";

async function getComments({ slug, headers }) {
  try {
    const { data } = await axios({
      url: `https://api.realworld.io/api/articles/${slug}/comments`,
      headers
    });
    return data.comments;
  } catch (error) {
    throw error;
  }
}

export default getComments;