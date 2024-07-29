import axios from "axios";
import errorHandler from "../helpers/errorHandler";

/**
 * Logs in a user to the application.
 * @param {Object} credentials - The user's email and password.
 * @returns {Promise} - A promise that resolves with the user's login information.
 */
async function userLogin({ email, password })
{
  try
  {
    const response = await axios.post("https://api.realworld.io/api/users/login", {
      user: { email, password },
    });

    const { user } = response.data;
    if (!user)
    {
      throw new Error("Failed to login user.");
    }

    const headers = { Authorization: `Token ${user.token}` };

    const loggedIn = { headers, isAuth: true, loggedUser: user };

    localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

    return loggedIn;
  } catch (error)
  {
    errorHandler(error);
  }
}

export default userLogin;

