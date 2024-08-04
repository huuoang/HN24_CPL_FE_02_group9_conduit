import axios from "axios";


const deleteArticle = async ({ slug, headers }) =>
{
  
  try
  {
    const response = await axios.delete(`https://api.realworld.io/api/articles/${slug}/`, { headers });
    return response.data;
  } catch (error)
  {
    if (error.response && error.response.status === 404)
    {
      throw new Error('Article not found');
    }
    else
    {
     
      throw error;
    }
  }
};

export default deleteArticle;


