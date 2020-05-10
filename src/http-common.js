import axios from "axios";

const UNAUTHORIZED = 401;
axios.interceptors.response.use(
  response => response,
  error => {
    const {status} = error.response;
    if (status === UNAUTHORIZED) {
      dispatch(userSignOut());
    }
    return Promise.reject(error);
 }
);

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin":"*"
  }
});