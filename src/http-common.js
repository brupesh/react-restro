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
  baseURL: "http://localhost:8000",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin":"*"
  }
});