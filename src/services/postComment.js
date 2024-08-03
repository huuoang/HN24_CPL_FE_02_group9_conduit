import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function postComment({ body, headers, slug })
{

  try
  {
    const { data } = await axios({
      data: { comment: { body } },
      headers,
      method: "POST",
      url: `https://api.realworld.io/api/articles/${slug}/comments`,
    });

    if (!data || !data.comment)
    {
      throw new Error('Invalid response data: comment is missing');
    }

    return data.comment;
  } catch (error)
  {
    errorHandler(error);
    throw error;
  }
}

export default postComment;

 