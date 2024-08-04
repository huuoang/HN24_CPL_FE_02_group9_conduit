// services/postComment.js
import axios from "axios";

async function postComment({ body, headers, slug }) {
  try {
    const { data } = await axios({
      method: "POST",
      url: `https://api.realworld.io/api/articles/${slug}/comments`,
      headers,
      data: { comment: { body } },
    });
    return data.comment;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default postComment;
