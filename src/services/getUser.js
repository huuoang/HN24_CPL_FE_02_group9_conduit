import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getUser({ headers }) {
  try {
    const response = await axios({
      headers,
      url: "https://api.realworld.io/api/user"
    });

    if (!response || !response.data || !response.data.user) {
      throw new Error("Invalid response data");
    }

    return response.data.user;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
}


export default getUser;

