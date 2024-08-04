import axios from "axios";

const deleteComment = async ({ commentId, headers, slug }) =>
{
  try
  {
    const response = await axios.delete(`https://api.realworld.io/api/articles/${slug}/comments/${commentId}`, { headers });
    return response.data;
  } catch (error)
  {
    
    throw error;
  }
};

export default deleteComment;

