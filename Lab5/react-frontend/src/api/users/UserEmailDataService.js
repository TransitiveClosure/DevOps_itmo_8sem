import axios from "axios";

const UserEmailDataService = async (email) => {
  try {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    return axios.post(`${apiUrl}/api/v1/notification`, null, {
      params: {
        email,
      },
    });
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default UserEmailDataService;
