import axios from "axios";

const AuthenticateUserDataService = (username, password) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  return axios
    .post(`${apiUrl}/api/v1/authenticate`, {
      username,
      password,
    })
    .then((res) => {
      if (res != null) {
        console.log(res);
        return res;
      }
    })
    .catch((err) => {
      let error = "";

      if (err.response) {
        error += err.response;
      }
      return error;
    });
};

export default AuthenticateUserDataService;
