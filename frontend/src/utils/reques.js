import axios from "axios";

const request = axios.create({
  baseURL: "https://ze-iupv.onrender.com/",
});

export default request;
