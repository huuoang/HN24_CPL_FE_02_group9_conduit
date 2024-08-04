import axios from "axios";
async function userUpdate({ headers, bio, email, image, password, username })
{

  try
  {
    const { data } = await axios({
      data: { user: { bio, email, image, password, username } },
      headers,
      method: "PUT",
      url: "https://api.realworld.io/api/user",
    });

    const { user } = data;

    if (!user)
    {
      throw new Error("Invalid response data");
    }

    const loggedIn = { headers, isAuth: true, loggedUser: user };

    localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

    return loggedIn;
  } catch (error)
  {
   
    throw error;
  }
}

export default userUpdate;

