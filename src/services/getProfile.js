import axios from "axios";

async function getProfile({ headers, username })
{

  try
  {
    const { data } = await axios({ headers, url: `https://api.realworld.io/api/profiles/${username}` });

    if (!data || !data.profile)
    {
      throw new Error("Invalid response data");
    }

    return data.profile;
  } catch (error)
  {  
    throw error;
  }
}

export default getProfile;

