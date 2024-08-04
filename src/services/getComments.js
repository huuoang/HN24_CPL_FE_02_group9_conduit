import axios from "axios";

async function getComments({ slug }) {
  try {
    const { data } = await axios({
      url: `https://api.realworld.io/api/articles/${slug}/comments`,
    });
    return data.comments;
  } catch (error) {
    throw error;
  }
}

export default getComments;
