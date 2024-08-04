import axios from "axios";
async function toggleFollow({ following, headers, username })
{

  try
  {
    const { data } = await axios({
      headers,
      method: following ? "DELETE" : "POST",
      url: `https://api.realworld.io/api/profiles/${username}/follow`,
    });

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

export default toggleFollow;

