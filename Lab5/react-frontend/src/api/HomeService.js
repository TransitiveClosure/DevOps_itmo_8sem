import React from "react";
import axios from "axios";

const HomeService = () => {
  try {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    return axios.get(`${apiUrl}/api/v1`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default HomeService;
