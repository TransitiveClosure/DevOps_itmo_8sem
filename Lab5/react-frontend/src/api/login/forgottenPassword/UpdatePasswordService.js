import axios from "axios";

const UpdatePasswordService = (id, password) => {
  console.log(id, password);

  try {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    return axios.put(`${apiUrl}/api/v1/password`, null, {
      params: {
        id,
        password,
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

export default UpdatePasswordService;
