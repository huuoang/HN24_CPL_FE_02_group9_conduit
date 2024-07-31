import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getComments({ slug })
{

  try
  {
    const response = await axios({ url: `https://api.realworld.io/api/articles/${slug}/comments` });
    const data = response.data;

    if (!data || !data.comments)
    {
      throw new Error("Invalid response data");
    }

    return data.comments;
  } catch (error)
  {
    errorHandler(error);
    throw error;
  }
}
 
export default getComments;

