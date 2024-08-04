import axios from "axios";

async function getTags()
{
  try
  {
    const response = await axios({ url: "https://api.realworld.io/api/tags" });

    if (!response || !response.data || !response.data.tags)
    {
      throw new Error("Invalid response data");
    }

    return response.data.tags;
  } catch (error)
  {
    
    throw error;
  }
}

export default getTags;

